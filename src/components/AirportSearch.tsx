import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import airportData from '../assets/airports.json';

// Shape of airport data
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
  label: string; // Label for the autocomplete field
  onAirportSelect: (airport: Airport | null) => void; // Callback when an airport is selected or cleared
}) => {
  // State for filtered airport options
  const [options, setOptions] = useState<Airport[]>([]);

  // Handles user input changes and filters airport data
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    // Clear options if the input is too short, to avoid garbage
    if (value.length <= 2) {
      setOptions([]);
      return;
    }

    // Filter and remove duplicate airports based on input
    const filteredAirports = Object.values(airportData)
      .filter((airport: any) => {
        const airportName = airport.name || '';
        const airportCode = airport.iata || '';
        // Match by name or IATA code
        return (
          airportName.toLowerCase().includes(value) ||
          airportCode.toLowerCase().includes(value)
        );
      })
      .reduce((unique: any[], airport: any) => {
        // Remove duplicates based on IATA code
        if (!unique.some((a) => a.iata === airport.iata)) {
          unique.push(airport);
        }
        return unique;
      }, []);

    // Map filtered results to Airport objects, ignoring invalid data
    const airportOptions: Airport[] = filteredAirports
      .filter((airport: any) => airport.lat && airport.lon) // Must be valid coordinates
      .map((airport: any) => ({
        name: airport.name || 'Unknown Airport',
        code: airport.iata || 'N/A',
        lat: airport.lat,
        lon: airport.lon,
      }));

    setOptions(airportOptions); // Update autocomplete options
  };

  return (
    <Autocomplete
      options={options} // List of filtered airports
      getOptionLabel={(option: Airport) => `${option.name} (${option.code})`} // Display name and code
      onChange={(event, value) => onAirportSelect(value)} // Trigger callback on selection
      renderInput={(params) => (
        <TextField {...params} label={label} onChange={handleInputChange} /> // Input field with label
      )}
    />
  );
};

export default AirportSearch;
