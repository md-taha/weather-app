require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Homepage route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Weather App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 0;
          padding: 0;
          background-color: #f4f4f9;
          color: #333;
        }
        header {
          background-color: #6200ea;
          color: white;
          padding: 1rem 0;
        }
        main {
          padding: 2rem;
        }
        a {
          color: #6200ea;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Welcome to the Weather App</h1>
      </header>
      <main>
        <p>To get the current weather, use the following endpoint:</p>
        <p><code>/weather?city=CityName</code></p>
        <p>Example: <a href="/weather?city=London">/weather?city=London</a></p>
      </main>
    </body>
    </html>
  `);
});

// Weather data route
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'London';
  const apiKey = process.env.OPENWEATHER_API_KEY; // Fetch API key from .env

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const weatherData = response.data;
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weather in ${weatherData.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
          }
          header {
            background-color: #6200ea;
            color: white;
            padding: 1rem 0;
          }
          main {
            padding: 2rem;
          }
          a {
            color: #6200ea;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Weather in ${weatherData.name}</h1>
        </header>
        <main>
          <p>Temperature: ${weatherData.main.temp}°C</p>
          <p>Description: ${weatherData.weather[0].description}</p>
          <p><a href="/">Back to Home</a></p>
        </main>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error: error.message });
  }
});

// Export the app for testing purposes
if (require.main === module) {
  // Start the server only when the file is executed directly
  app.listen(PORT, () => {
    console.log(`Weather app is running on http://localhost:${PORT}`);
  });
} else {
  module.exports = app;  // This will allow testing without starting the server
}
