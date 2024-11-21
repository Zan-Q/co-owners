import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, useNavigate, Link } from '@remix-run/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';

//Import API
import { generalAPI } from "../../api/generalAPI.js"; // Adjust the path as necessary

// Import custom hook
import { useUserLocation } from '../../hooks/userLocation.js'; // Adjust the path as necessary

// Loading Screen
import RingLoader from "react-spinners/RingLoader";

// Define the Business type
interface Business {
  id: string;
  name: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
}

export const defaultCoordinates = { lat: 52.1505506, lng: -106.7468104 };

export default function Stocks() {
  //const initialBusinesses = useLoaderData<Business[]>();
  const [businesses, setBusinesses] = useState<Business[] | null>(null);
  const navigate = useNavigate();
  const userLocation = useUserLocation();

  const handleMarkerClick = useCallback((id: string) => {
    navigate(`/stocks/${id}`);
  }, [navigate]);

  useEffect(() => {
    if (userLocation) {
      // Fetch businesses based on user location
      generalAPI.getLocalCompanies(userLocation.lat, userLocation.lng).then((data: Business[]) => {
        
        const transformedData = data.map((business: any) => ({
          id: business._id,
          name: business.name,
          coordinates: business.coordinates,
        }));
        setBusinesses(transformedData);
      });
    }
  }, [userLocation]);

  if (!businesses) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader
          color={"#000080"}
          loading={true}
          size={100}
          aria-label="Loading Maps"
        />    
      </div>
    );
  }
  else {
    return (
      <LoadScript googleMapsApiKey="AIzaSyCn_0w1J9f-e1m7YKb59DhsRIftV05XU7A">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100vh' }}
          center={userLocation || defaultCoordinates}
          zoom={10}
        >
          {businesses.map((business) => (
            <Marker
              key={business.id}
              position={{ lat: business.coordinates.coordinates[1], lng: business.coordinates.coordinates[0] }}
              onClick={() => handleMarkerClick(business.id)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  }
}