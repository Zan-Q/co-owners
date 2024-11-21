import { LoaderFunction, json } from '@remix-run/node';
import { Meta, useLoaderData } from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import { MetaFunction } from '@remix-run/node';
import { sessionKey } from '#app/utils/auth.server.ts'
import { authSessionStorage } from '#app/utils/session.server.ts'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

//Import API
import { generalAPI } from "../../api/generalAPI.js"; // Adjust the path as necessary
import { userAPI } from "../../api/userAPI.js"; // Adjust the path as necessary
import { transactionAPI } from "../../api/transactionAPI.js"; // Adjust the path as necessary

import { format } from 'date-fns';
import { handle } from '../settings+/profile.js';
import { Link } from '@remix-run/react';
import { useNavigate } from 'react-router-dom';

//Toast
import { ToastContainer, toast as showToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Loading Screen
import RingLoader from "react-spinners/RingLoader";

//Image Carousel
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

//Embla
import '#app/styles/embla.css';

import { isMobile } from 'react-device-detect';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define the Business type
interface Business {
  id: string;
  name: string;
  logo: string;
  location: string;
  coordinates: [number, number];
  imageAssets: [
    {
      imagePath: string;
    }
  ]
  maxPricePerShare: number;
  growthPercentage: number;
  valuation: [
    {
      valuation: number;
      maxPricePerShare: number;
      valDate: string;
    }
  ];
  buyOrders: [
    {
      amount: number;
      tradeDate: string;
    }
  ];
  sellOrders: [
    {
      amount: number;
      tradeDate: string;
    }
  ];
}

//Ownership Permissions
interface Ownership {
  buy: boolean;
  sell: boolean;
  balance: number;
  watchlist: boolean;
}

export const options = {
  responsive: true,
  tension: 0.3 // 2. Set the tension (curvature) of the line to your liking.  (You may want to lower this a smidge.)
};


// Fetch business details
export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;

  // Fetch data here
	const business = await generalAPI.getPublicCompany(id);

  //See if we are logged in by checking the session
  const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
  const session = authSession.get(sessionKey);

  //Set Session if we are logged in
  if (session) {

    //Get client ownership details of this business
    const ownerPermissions = await userAPI.getUserOwnedStocks(session, id);

    if (ownerPermissions) {
      return json({business, token: session, ownerPermissions});
    }
    else {
      return json({business});
    }
  }
  else {
    return json({business});
  }
};

// Meta function to add social media headers
export const meta: MetaFunction = ({ data }: { data: any }) => {
  if (!data || !data.business) {
    return [];
  }

  const { business } = data;
  
  return [
    { title: `Co-Owners: ${business.name}` },
    { property: "og:title", content: `Co-Owners: ${business.name}` },
    { property: "og:description", content: `${business.name} co-owners page` },
    { property: "og:image", content: business.logo },
    { property: "og:url", content: `https://co-owners.ca/stocks/${business.id}` },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Co-Owners: ${business.name}` },
    { name: "twitter:description", content: `${business.name} co-owners page` },
    { name: "twitter:image", content: business.logo },
    { name: "twitter:url", content: `https://co-owners.ca/stocks/${business.id}` },
  ];
};


export default function BusinessDetails() {

  const { business, token, ownerPermissions }  = useLoaderData<{ business: Business, token: string, ownerPermissions: Ownership}>();

  const googleMapsLink = `https://www.google.com/maps?q=${business.coordinates[1]},${business.coordinates[0]}`;
  
  // State to manage user login status
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  const navigate = useNavigate();

  const data = {
    labels: business.valuation.map((entry) => format(new Date(entry.valDate), 'MMM yyyy')),
    datasets: [
      {
        label: 'Max Current Price',
        data: business.valuation.map((entry) => entry.maxPricePerShare),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: {
          target: "origin", // 3. Set the fill options
          above: "rgba(255, 0, 0, 0.3)"
        },
        tension: 0.4, // Smooth out the lines
      },
    ],
  };


  // Handler for Buy button click
  const handleBuyClick = (ownerPermissions: Ownership) => {

    const buyLink = new URLSearchParams({
      type: 'Buy',
      businessId: business.id,
      balance: ownerPermissions.balance.toString()
    }).toString();

    if (isLoggedIn) {
      if (!ownerPermissions.buy) {

        showToast.error('You already own this stock already, maximum ownership is one stock per business.');

        return;
      }
      else {
        // Perform buy action
        navigate(`/transact?${buyLink}`);
      }
    } else {
      // Redirect to login or show login prompt
      console.log('User is not logged in. Redirect to login.');
    }
  };

  // Handler for Sell button click
  const handleSellClick = async (ownerPermissions: Ownership) => {

    const sellLink = new URLSearchParams({
      type: 'Sell',
      businessId: business.id,
      balance: ownerPermissions.balance.toString()
    }).toString();

    if (isLoggedIn) {
      if (!ownerPermissions.sell) {

        showToast.error('You do not have any shares to sell.');

        console.log('User does not have permission to sell.');
        return;
      }
      else {
        // Perform sell action
        console.log('User is logged in. Proceed with Sell action.');
        navigate(`/transact?${sellLink}`);
      }
    } else {
      // Redirect to login or show login prompt
      console.log('User is not logged in. Redirect to login.');
    }
  };

  // Handler for Watchlist button click
  const handleWatchlistClick = async (ownerPermissions: Ownership) => {

    if (isLoggedIn) {
    
      const response = await transactionAPI.addToWatchlist(business.id, token);

      if (response.status === 200) {

        showToast.success('Business added to watchlist.');

        // Refresh the page after the toast message
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Adjust the timeout duration as needed
      }
      else {
        showToast.error('Error adding business to watchlist.');
      }
    }
  }; 

  // Handler for Remove Watchlist button click
  const removeWatchlistClick = async (ownerPermissions: Ownership) => {

    if (isLoggedIn) {

      const response = await transactionAPI.removeFromWatchlist(business.id, token);

      if (response.status === 200) {

        showToast.success('Business removed from watchlist.');

        // Refresh the page after the toast message
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Adjust the timeout duration as needed
      }
      else {
        showToast.error('Error removing business from watchlist.');
      }
    }
  }

  /**
   * Google Maps link to the business location
   */
  const googleMapsPanel = () => (
    <div className="bg-gray-400">
      <div className="p-4 lg:w-3/4 sm:w-full mx-auto">
        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
          <LoadScript googleMapsApiKey="AIzaSyCn_0w1J9f-e1m7YKb59DhsRIftV05XU7A">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '30vh', borderRadius: '1rem' }}
              center={{ lat: business.coordinates[1], lng: business.coordinates[0] }}
              zoom={15}
            >
              <Marker
                key={business.id}
                position={{ lat: business.coordinates[1], lng: business.coordinates[0] }}
              />
            </GoogleMap>
          </LoadScript>
        </a>
      </div>
    </div>
  );

  /**
   * Button panel for buying and selling stock
   */
  const buttonPanel = (ownerPermissions: Ownership) => (
    <div className="p-4 w-full sm:w-3/4 mx-auto flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:gap-4">
      <button 
        className={`py-4 px-10 rounded-xl text-xl sm:text-2xl ${ownerPermissions && ownerPermissions.buy ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
        onClick={(e) => handleBuyClick(ownerPermissions)}
        disabled={!ownerPermissions || !ownerPermissions.buy}
      >
        Buy
      </button>
      <button 
        className={`py-4 px-10 rounded-xl text-xl sm:text-2xl ${ownerPermissions && ownerPermissions.sell ? 'bg-red-500 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
        onClick={(e) => handleSellClick(ownerPermissions)}
        disabled={!ownerPermissions || !ownerPermissions.sell}
      >
        Sell
      </button>
      <button 
        className={`py-4 px-10 rounded-xl text-xl sm:text-2xl ${ownerPermissions && !ownerPermissions.watchlist ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
        onClick={ownerPermissions && !ownerPermissions.watchlist ? () => handleWatchlistClick(ownerPermissions) : () => removeWatchlistClick(ownerPermissions)}
        disabled={!ownerPermissions}
      >
        {!ownerPermissions || !ownerPermissions.watchlist ? "Add to Watchlist" : "Remove from Watchlist" }
      </button>
    </div>
  );


  /**
   * Graph of the business valuation and Current Price
   */
  const graph = () => (
    <div className="p-2 lg:p-4 w-full lg:w-3/4 mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center lg:text-left">Valuation</h2>
      <Line data={data} />
    </div>
  );

  /**
   * Screenshot the Business
   */

  /**
   * Buy and Sell open orders table
   * @returns JSX.Element
   */
  const orderTable = () => (
    <div className="bg-blue-400">
      <div className="p-4 w-full sm:w-3/4 mx-auto">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold text-white mb-3 text-center lg:text-left">Sell Orders</h3>
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {business.sellOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">${order.amount.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{new Date(order.tradeDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-3 text-center lg:text-left">Buy Orders</h3>
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {business.buyOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">${order.amount.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{new Date(order.tradeDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Image Carousel of the Business
   */
  const imageCarousel = () => {
    const [viewportRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay()]);

    return (
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {business.imageAssets.map((image, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <img src={image.imagePath} alt={business.name}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const uploadLink = new URLSearchParams({
    businessName: business.name,
    logoUrl: business.logo,
    businessId: business.id,
  }).toString();

  if (isMobile) {
    return (
      <div>
        {googleMapsPanel()}
        <div className="bg-gray-200">
          <div className="flex flex-col w-3/4 mx-auto p-4">
            <div className="flex items-start flex-col justify-between items-center mb-4">
              <img src={business.logo} alt={`${business.name} Logo`} className="w-16 h-16 object-contain mb-2 sm:mb-0" />
            </div>
            <div className="flex flex-col sm:items-start">
              <h1 className="text-2xl font-bold sm:text-left">{business.name}</h1>
              <p className="sm:text-left">{business.location}</p>
            </div>
            <div className="text-center mt-5">
              <p className="text-3xl font-semibold">${business.maxPricePerShare.toFixed(2)}</p>
              <p className={`text-lg ${business.growthPercentage >= 0 ? 'text-green-500 ' : 'text-red-500'}`}>
                {business.growthPercentage >= 0 ? '+' : ''}{business.growthPercentage.toFixed(2)}%
              </p>
            </div>
            <div className="flex mt-4 justify-center">
              <Link to={`/upload?${uploadLink}`} >
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Upload Reciept
                </button>
              </Link>
            </div>
          </div>
        </div>
        {imageCarousel()}
        {graph()}
        {buttonPanel(ownerPermissions)}
        {orderTable()}
      </div>
    );
  }

  else {
    return (
      <div>
        <ToastContainer position='top-center' />
        {googleMapsPanel()}

        <div className="bg-gray-200">
          <div className="flex flex-col w-3/4 mx-auto p-4">
            <div className="flex items-start justify-between items-center mb-4">
              <img src={business.logo} alt={`${business.name} Logo`} className="w-16 h-16 object-contain mb-2" />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{business.name}</h1>
                <p className="text-left">{business.location}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold">${business.maxPricePerShare.toFixed(2)}</p>
                <p className={`text-lg ${business.growthPercentage >= 0 ? 'text-green-500 ' : 'text-red-500'}`}>
                  {business.growthPercentage >= 0 ? '+' : ''}{business.growthPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link to={`/upload?${uploadLink}`} >
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Upload Reciept
                </button>
              </Link>
            </div>
          </div>
        </div>
        {imageCarousel()}
        {graph()}
        {buttonPanel(ownerPermissions)}
        {orderTable()}
      </div>
    );
  }
}