import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '270px', // Set a fixed height
  borderRadius: '15px', // Apply border-radius to the map container
  overflow: 'hidden' // Ensure the rounded corners display correctly
};

const indiaPosition = {
  lat: 20.5937, // Latitude of India's center
  lng: 78.9629  // Longitude of India's center
};

const GoogleMapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    // Get the user's current location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
        // If user denies location access, fall back to India's location
        setCurrentPosition(indiaPosition);
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBjUMlORrIPe1pCTpOJspLtJnhhL8GMvco">
      {currentPosition ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={5} // Adjust zoom level as needed
        >
          {/* Marker at the current or fallback position */}
          <Marker position={currentPosition} />
        </GoogleMap>
      ) : (
        <p>Loading map...</p> // Display while the location is being fetched
      )}
    </LoadScript>
  );
};

export default GoogleMapComponent;
