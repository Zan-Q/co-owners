import { useState, useEffect } from 'react';

const defaultCoordinates = { lat: 52.1505506, lng: -106.7468104 }; // Replace with your default coordinates

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Fallback to a default location if user denies location access
          setUserLocation(defaultCoordinates);
        }
      );
    } else {
      // Fallback to a default location if geolocation is not supported
      setUserLocation(defaultCoordinates);
    }
  }, []);
  
  return userLocation;
}