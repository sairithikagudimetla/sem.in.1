const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  try {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
  } catch (error) {
    weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('City not found');
  }
  const data = await response.json();
  return data;
};

const displayWeather = ({ name, main: { temp }, weather }) => {
  const { description, icon } = weather[0];
  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
    <p>Temperature: ${temp}°C</p>
    <p>Condition: ${description}</p>
  `;
};