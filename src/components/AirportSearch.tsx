import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import airportData from '../assets/airports.json';

// Define the shape of airport data
interface Airport {
  name: string;
  code: string;
  lat: number;
  lon: number;
}

const AirportSearch = ({
  label,
  onAirportSelect,
}: {
  label: string;
  onAirportSelect: (airport: Airport | null) => void; // Allow null in case the user clears the selection
}) => {
  // State with the correct type
  const [options, setOptions] = useState<Airport[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
  
    // Clear the options if the input is too short
    if (value.length <= 2) {
      setOptions([]); // Clear results
      return;
    }
  
    // Proceed with filtering if the input is long enough
    const filteredAirports = Object.values(airportData)
      .filter((airport: any) => {
        const airportName = airport.name || '';
        const airportCode = airport.iata || '';
        return (
          airportName.toLowerCase().includes(value) ||
          airportCode.toLowerCase().includes(value)
        );
      })
      .reduce((unique: any[], airport: any) => {
        // Check if the airport with the same IATA code is already in the unique list
        if (!unique.some((a) => a.iata === airport.iata)) {
          unique.push(airport);
        }
        return unique;
      }, []);
  
    // Only map valid airports
    const airportOptions: Airport[] = filteredAirports
      .filter((airport: any) => airport.lat && airport.lon) // Filter out invalid airports
      .map((airport: any) => ({
        name: airport.name || 'Unknown Airport',
        code: airport.iata || 'N/A',
        lat: airport.lat,
        lon: airport.lon,
      }));
  
    setOptions(airportOptions); // Update the options
  };
  
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option: Airport) => `${option.name} (${option.code})`}
      onChange={(event, value) => onAirportSelect(value)} // Pass selected airport or null
      renderInput={(params) => <TextField {...params} label={label} onChange={handleInputChange} />}
    />
  );
};

export default AirportSearch;
