import React, { useState } from 'react';
import AirportSearch from './components/AirportSearch.tsx';
import Map from './components/Map.tsx';
import calculateDistance from './utils/calculateDistance.ts';
import './App.css';

const App = () => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }[]>([undefined, undefined]);
  const [labels, setLabels] = useState<string[]>(['', '']);
  const [distance, setDistance] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0); // Trigger refresh when needed

  const handleAirportSelect = (airport: Airport | null, position: number) => {
    setCoordinates(prevCoords => {
      const updatedCoords = [...prevCoords];
      if (airport) {
        updatedCoords[position] = { lat: airport.lat, lng: airport.lon };
      } else {
        updatedCoords[position] = undefined; // Clear the position if the city is deleted
      }

      // Trigger distance calculation if both FROM and TO are valid
      if (updatedCoords[0] && updatedCoords[1]) {
        const [coord1, coord2] = updatedCoords;
        const dist = calculateDistance(coord1.lat, coord1.lng, coord2.lat, coord2.lng);
        setDistance(dist);
      } else {
        setDistance(null); // Clear distance if either is missing
      }

      setRefresh(refresh + 1); // Force map refresh
      return updatedCoords;
    });

    setLabels(prevLabels => {
      const updatedLabels = [...prevLabels];
      if (airport) {
        updatedLabels[position] = airport.name;
      } else {
        updatedLabels[position] = ''; // Clear the label if the city is deleted
      }
      return updatedLabels;
    });
  };

  return (
    <div>
      <h1>Airport Distance Calculator</h1>
      <AirportSearch label="From" onAirportSelect={(airport) => handleAirportSelect(airport, 0)} />
      <AirportSearch label="To" onAirportSelect={(airport) => handleAirportSelect(airport, 1)} />
      {distance && <p>Distance: {distance.toFixed(2)} nautical miles</p>}
      <Map coordinates={coordinates} refresh={refresh} />
    </div>
  );
};

export default App;