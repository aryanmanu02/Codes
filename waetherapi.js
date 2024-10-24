import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = 'e6e24e0612ab2e6193b2a122db220e32'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError(null);
    setWeather(null);

    if (!location) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;

// .App {
//   text-align: center;
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
// }

// input {
//   padding: 10px;
//   width: 60%;
//   margin-right: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// }

// button {
//   padding: 10px 15px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// }

// button:hover {
//   background-color: #0056b3;
// }

// .weather-info {
//   margin-top: 20px;
// }

// .error {
//   color: red;
// }
