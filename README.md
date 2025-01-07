https://github.com/DanielT504/airport-distance-calculator

# **Airport Distance Calculator**

The Airport Distance Calculator is a React-based web application that allows users to calculate the distance in nautical miles between two U.S. airports. The app also plots the flying route on Google Maps and provides an intuitive, responsive interface.

---

## **Demo**
You can access the live application [here](https://your-netlify-url.netlify.app).

---

## **Technologies Used**
- **Frontend Framework**: React with TypeScript  
- **UI Library**: Material UI  
- **Mapping**: Google Maps API  
- **Deployment**: Netlify  

---

## **Getting Started**

### **Prerequisites**
- Node.js (v14+)
- A Google Maps API key with the Maps JavaScript API enabled.

### **Installation**
1. Clone the repository:
   git clone https://github.com/your-username/airport-distance-calculator.git
   cd airport-distance-calculator
2. Install dependencies:
   npm install
3. Create a .env file in the root directory and add your Google Maps API key:
   REACT_APP_GOOGLE_MAPS_API_KEY=your-api-key

## **Usage**
1. Enter the name or code of a U.S. airport in the "From" field.
2. Select an airport from the dropdown list.
3. Repeat for the "To" field.
4. View the calculated distance (in nautical miles) and the flying route displayed on the map.

---

## **Deployment**
To deploy the app to [Netlify](https://www.netlify.com/):
1. Build the project:
   npm run build
2. Drag and drop the build folder into the Netlify deployment interface.
3. Add your Google Maps API key as an environment variable in Netlify.