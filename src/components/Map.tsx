import React from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import './Map.css';

const Map = ({ coordinates, refresh }: { coordinates: { lat: number; lng: number }[], refresh: number }) => {
  const mapContainerStyle = { width: '100%', height: '400px' };
  const defaultCenter = { lat: 39.8283, lng: -98.5795 }; // Map centered on the USA

  // Adjust bounds to fit all markers and the route
  const fitBounds = (map: google.maps.Map) => {
    if (coordinates[0] && coordinates[1]) {
      const bounds = new google.maps.LatLngBounds();
      coordinates.forEach(coord => coord && bounds.extend(coord)); // Extend bounds to include each coordinate
      map.fitBounds(bounds, { top: 25, bottom: 25, left: 25, right: 25 }); // Add padding for better visibility
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
      {/* Wrapper for the map with styling applied */}
      <div className="map-container">
        <GoogleMap
          key={refresh} // Force re-render when the refresh value changes
          mapContainerStyle={mapContainerStyle}
          center={coordinates[0] || defaultCenter} // Center on the first coordinate or default
          zoom={coordinates[0] && coordinates[1] ? undefined : 5} // Adjust zoom
          onLoad={(map) => fitBounds(map)} // Fit bounds when map loads
        >
          {/* Place markers for each valid coordinate */}
          {coordinates.map((coord, index) =>
            coord ? <Marker key={index} position={coord} /> : null
          )}
          {/* Draw a red line connecting the two coordinates if both are valid */}
          {coordinates[0] && coordinates[1] && (
            <Polyline
              path={coordinates.filter(coord => coord)} // Filter out any undefined coordinates
              options={{ strokeColor: '#FF0000', strokeWeight: 2 }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
