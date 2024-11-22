import React, { useState } from 'react';

import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { sessionKey } from '#app/utils/auth.server.ts'
import { authSessionStorage } from '#app/utils/session.server.ts'
import { useNavigate } from 'react-router-dom';

//Import API
// @ts-ignore
import { generalAPI } from "../../api/generalAPI.js";
// @ts-ignore
import { transactionAPI } from "../../api/transactionAPI.js"; 

//Toast
import { ToastContainer, toast as showToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { isMobile } from 'react-device-detect';

// Define the Business type
interface Business {
  id: string;
  name: string;
  logo: string;
  location: string;
  coordinates: [number, number];
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

interface ButtonPanelProps {
  transactionType: string;
  balance: number | null;
}

// Fetch business details
export const loader: LoaderFunction = async ({ request }) => {
  
  const url = new URL(request.url);
  const businessId = url.searchParams.get('businessId');
  const transactionType = url.searchParams.get('type');
  const balance = url.searchParams.get('balance');
  const message = url.searchParams.get('message');

  // Fetch data here
	const business = await generalAPI.getPublicCompany(businessId);

  //See if we are logged in by checking the session
  const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
  const session = authSession.get(sessionKey);

  //Set Session if we are logged in
  if (session) {
    if (message === 'deposit') {
      return json({business, transactionType, balance, token: session, message: 'Deposit Successful'});
    }
    else {
      return json({business, transactionType, balance, token: session});
    }
  }
  else {
    return json({business, transactionType});
  }
};

export default function BusinessDetails() {

  const { business, transactionType, balance, token, message }  = useLoaderData<{ business: Business, transactionType: string, balance: string, token: string, message: string }>();

  // State to manage user login status
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  //Raise Toast if message
  if (message) {
    showToast.success('Deposit Successful');
  }

  // Handler for Buy button click
  const handleBuyClick = async (buyPrice: number) => {

    if (isLoggedIn) {
      try {
        // Perform buy action
        const response = await transactionAPI.buyStock(business.id, buyPrice, token)

        if (response && response.status === 200) {
          showToast.success('Your buy order has been placed or completed successfully');

          // Redirect to /dashboard
          navigate('/dashboard');
        }
      } catch (error) {

          const buyLink = new URLSearchParams({
              type: 'Buy',
              businessId: business.id,
              balance: balance,
              message: 'deposit'
          }).toString();

          const stripeFee = Math.ceil((buyPrice * 0.029 + 0.30) * 100) / 100;
          const adminFee = 0.10;
          const totalFee = Math.ceil((buyPrice + stripeFee + adminFee) * 100) / 100;

          const redirectUrlParms = new URLSearchParams({
              amount: totalFee.toFixed(2).toString(),
              businessId: business.id,
              balance: balance,
              token: token,
              redirect: `/transact?${buyLink}`,
          }).toString();

          //Not enough funds
          const redirectUrl = '/stripe?' + redirectUrlParms;

          // Redirect to Stripe Payment
          navigate(redirectUrl);
          
          throw error;
          
      }
    } else {

      // Redirect to login or show login prompt
      showToast.success('You must be logged in to buy stock');

      // Redirect to /dashboard
      navigate('/login');
    }
  };

  // Handler for Sell button click
  const handleSellClick = async (sellPrice: number) => {

    if (isLoggedIn) {

      // Perform buy action
      const response = await transactionAPI.sellStock(business.id, sellPrice, token)

      if (response.status === 200) {
      
        showToast.success('Your sell order has been placed or completed successfully');

        // Redirect to /dashboard
        navigate('/dashboard');
      }
    } else {

      // Redirect to login or show login prompt
      showToast.success('You must be logged in to sell your stock');

      // Redirect to /dashboard
      navigate('/login');
    }
  };
  
  /**
   * Button panel for buying and selling stock
   */
  const ButtonPanel: React.FC<ButtonPanelProps> = ({ transactionType, balance }) => {
    const [buyPrice, setBuyPrice] = useState<number | "">(0);
    const [sellPrice, setSellPrice] = useState<number | "">(0);
    
    const handleBuySubmit = async (event: React.FormEvent) => {
      
      event.preventDefault();

      //Check to see if buyPrice does not exceed Max Price Per Share
      if (typeof buyPrice === 'number' && buyPrice > business.maxPricePerShare) {
        
        //Raise Toast
        showToast.error('Your buy price cannot exceed the maximum allowed price per share');
      }
      else if (typeof buyPrice === 'number' && buyPrice > 0) {

        const isConfirmed = window.confirm(`Are you sure you want to buy at $${sellPrice}?`);
        if (isConfirmed) {
          try {
            await handleBuyClick(buyPrice as number);
            // Handle success (e.g., show a success message)
          } catch (error) {
            // Handle error (e.g., show an error message)
            console.error(error);
          }
        };
      }
    };
  
    const handleSellSubmit = async (event: React.FormEvent) => {

      event.preventDefault();

      //Check to see if buyPrice does not exceed Max Price Per Share
      if (typeof sellPrice === 'number' && sellPrice > business.maxPricePerShare) {

        //Raise Toast
        showToast.error('Your sell price cannot exceed the maximum allowed price per share');

      }
      else if (typeof sellPrice === 'number' && sellPrice > 0) {
        const isConfirmed = window.confirm(`Are you sure you want to sell at $${sellPrice}?`);
        if (isConfirmed) {
          try {
            await handleSellClick(sellPrice as number);
            // Handle success (e.g., show a success message)
          } catch (error) {
            // Handle error (e.g., show an error message)
            console.error(error);
          }
        };
      }
    };

    /** Price Validation */
    const handlePriceChange = (setter: React.Dispatch<React.SetStateAction<number | ''>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      
      //Numbers and Decimale only
      if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
        setter(Number(value));
      }
    };

    if (transactionType === 'Buy') {
      return (
        <div className="p-4 w-full sm:w-3/4 lg:w-1/4 mx-auto flex justify-center shadow-2xl mt-3 mb-3 rounded-xl">
          <form onSubmit={handleBuySubmit} className="flex flex-col items-center space-y-4">
            {/* Display balance if it is not null */}
            {balance !== null && (
              <>
                <label htmlFor="balance" className="text-md font-semibold">Account Balance</label>
                <p className="text-lg">${Number(balance).toFixed(2)}</p>
              </>
            )}
            <label htmlFor="buyPrice" className="text-xl font-semibold">Buy Price</label>
            <div className="flex items-center space-x-2">
              <span className="text-xl">$</span>
              <input
                type="number"
                value={buyPrice}
                onChange={handlePriceChange(setBuyPrice)}
                placeholder="Enter buy price"
                className="py-2 px-4 rounded-xl text-xl"
                step="0.01"
              />
            </div>
            <div className="text-md text-right w-full">Transaction Fee: $0.10</div>
            <div className="text-xl text-right w-full">Buy Price: 
              <span className="text-2xl text-blue-600"> ${(buyPrice ? buyPrice + 0.10 : 0).toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-4 px-10 rounded-xl text-2xl w-full"
            >
              Buy
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="p-4 w-full sm:w-3/4 lg:w-1/4 mx-auto flex justify-center shadow-2xl mt-3 mb-3 rounded-xl">
          <form onSubmit={handleSellSubmit} className="flex flex-col items-center space-y-4">
            <label htmlFor="sellPrice" className="text-xl font-semibold">Sell Price</label>
            <div className="flex items-center space-x-2">
              <span className="text-xl">$</span>
              <input
                type="number"
                value={sellPrice}
                onChange={handlePriceChange(setSellPrice)}
                placeholder="Enter sell price"
                className="py-2 px-4 rounded-xl text-xl"
                step="0.01"
              />
            </div>
            <div className="text-md text-left w-full">Transaction Fee: $0.10</div>
            <div className="text-xl text-left w-full">Sale Revenue: 
              <span className="text-2xl text-blue-600"> ${(sellPrice ? sellPrice - 0.10 : 0).toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white py-4 px-10 rounded-xl text-2xl w-full"
            >
              Sell
            </button>
          </form>
        </div>
      );
    }
  };

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

  return (
    <div>
      <ToastContainer position="top-center" />
      <div className="bg-gray-200">
        { isMobile ? (
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
            </div>
        ) : (
          <div className="flex flex-col w-3/4 mx-auto p-4">
            <div className="flex items-start justify-between items-center mb-4">
              <img src={business.logo} alt={`${business.name} Logo`} className="w-16 h-16 object-contain mb-2" />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{business.name}</h1>
                <p>{business.location}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold">${business.maxPricePerShare.toFixed(2)}</p>
                <p className={`text-lg ${business.growthPercentage >= 0 ? 'text-green-500 ' : 'text-red-500'}`}>
                  {business.growthPercentage >= 0 ? '+' : ''}{business.growthPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div> 
        ) 
        }
      </div>
      {buttonPanel(transactionType)}
      {orderTable()}
    </div>
  );
}