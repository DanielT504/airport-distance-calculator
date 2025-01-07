// Degrees to radians
const toRadians = (degrees: number) => degrees * (Math.PI / 180); 

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 3440.07; // r_earth in nautical miles

  // Difference in lat/long, in radians
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  // Haversine formula to get the great-circle distance
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Latitude difference squared
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * // Adjust for Earth's curvature
    Math.sin(dLon / 2) * Math.sin(dLon / 2); // Longitude difference squared

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Central angle in radians

  return R * c; // Distance in nautical miles
};

export default calculateDistance;
