import React, { useState } from 'react';
import AirportSearch from './components/AirportSearch.tsx';
import Map from './components/Map.tsx';
import calculateDistance from './utils/calculateDistance.ts';
import './App.css';

type Airport = {
  name: string;
  lat: number;
  lon: number;
};

const App = () => {
  // States to store airport coordinates, names/labels, and distance between them
  const [coordinates, setCoordinates] = useState<({ lat: number; lng: number } | undefined)[]>([undefined, undefined]);
  const [labels, setLabels] = useState<string[]>(['', '']);
  const [distance, setDistance] = useState<number | null>(null);
  
  // Trigger a map refresh when necessary
  const [refresh, setRefresh] = useState(0);

  // Handles selecting or clearing an airport from the dropdown
  const handleAirportSelect = (airport: Airport | null, position: number) => {
    setCoordinates(prevCoords => {
      const updatedCoords = [...prevCoords];
      if (airport) {
        // Update the coordinates
        updatedCoords[position] = { lat: airport.lat, lng: airport.lon };
      } else {
        // Clear the position if the airport is removed
        updatedCoords[position] = undefined;
      }

      // Calculate distance only if both FROM and TO airports are selected
      if (updatedCoords[0] && updatedCoords[1]) {
        const [coord1, coord2] = updatedCoords;
        const dist = calculateDistance(coord1.lat, coord1.lng, coord2.lat, coord2.lng);
        setDistance(dist);
      } else {
        setDistance(null); // Clear distance if one of them is missing
      }

      setRefresh(refresh + 1); // Trigger map refresh
      return updatedCoords;
    });

    // Update the labels for the selected airports
    setLabels(prevLabels => {
      const updatedLabels = [...prevLabels];
      if (airport) {
        updatedLabels[position] = airport.name;
      } else {
        updatedLabels[position] = ''; // Clear label if the airport is removed
      }
      return updatedLabels;
    });
  };

  return (
    <div>
      {/* App title */}
      <h1>Airport Distance Calculator</h1>
      
      {/* Airport selection components */}
      <AirportSearch label="From" onAirportSelect={(airport) => handleAirportSelect(airport, 0)} />
      <AirportSearch label="To" onAirportSelect={(airport) => handleAirportSelect(airport, 1)} />
      
      {/* Display the calculated distance if available */}
      {distance && <p>Distance: {distance.toFixed(2)} nautical miles</p>}
      
      {/* Google Map displaying the selected airports and route */}
      <Map coordinates={coordinates.filter(coord => coord !== undefined) as { lat: number; lng: number }[]} refresh={refresh} />
    </div>
  );
};

export default App;
