import React from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import './Map.css';

const Map = ({ coordinates, refresh }: { coordinates: { lat: number; lng: number }[], refresh: number }) => {
  const mapContainerStyle = { width: '100%', height: '400px' };
  const defaultCenter = { lat: 39.8283, lng: -98.5795 }; // Default center: USA

  const fitBounds = (map: google.maps.Map) => {
    if (coordinates[0] && coordinates[1]) {
      const bounds = new google.maps.LatLngBounds();
      coordinates.forEach(coord => coord && bounds.extend(coord));
      map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 }); // Add padding
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAjaxfrufj6Yi1zosYuyWOa4deAvfACYos">
      <div className="map-container">
        <GoogleMap
            key={refresh} // Force re-render when refresh changes
            mapContainerStyle={mapContainerStyle}
            center={coordinates[0] || defaultCenter}
            zoom={coordinates[0] && coordinates[1] ? undefined : 5}
            onLoad={(map) => fitBounds(map)}
        >
            {coordinates.map((coord, index) =>
            coord ? <Marker key={index} position={coord} /> : null
            )}
            {coordinates[0] && coordinates[1] && (
            <Polyline path={coordinates.filter(coord => coord)} options={{ strokeColor: '#FF0000', strokeWeight: 2 }} />
            )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
