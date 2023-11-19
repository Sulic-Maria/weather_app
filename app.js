import { getWeatherByCity } from "./api/weather.js";
import { getForecastData, getForecastByCity } from "./api/forecast.js";
import { createWeatherObject } from "./utils/dataFormatting.js";

const weatherWindow = document.querySelector('.weather');
const forecastWindow = document.querySelector('.forecast')
const city = document.querySelector('.city');
const search = document.querySelector('.search');

// Click on button search and enter on the city field
search.addEventListener('click', () => {
    displayWeatherInformation();
});
city.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') displayWeatherInformation();
});

async function displayWeatherInformation() {
    const response = await getWeatherByCity(city.value || 'Bucharest');
    const forecastRespone = await getForecastData(city.value || 'Bucharest');
    const forecast = await getForecastByCity(forecastRespone);

        
        
    const weather = createWeatherObject(response);
    weatherWindow.innerHTML = `
    <div class="header">
        <div>
            <div class="main">${weather.main}</div>
            <span class="country">${weather.country}</span>
            <span class="region">${weather.region}</span>
            
        </div>
        <div>
            <img height="50px" src="http://openweathermap.org/img/w/04d.png" alt="forecast icon" id="icon" />
        </div>
        <div>
            <label>Date:</label>
            <span class="date">${weather.date}</span>
        </div>
    </div>
    <div class="temp-details">
        <div class="main-temp">
            <span class="temp" class="temperature">${weather.temp}</span>
            <span class="unit">&#x2103;</span>
        </div>
        <div class="other-temp">
            <div>
                <label for="feel">Feels like:</label>
                <span class="feel" class="temperature">${weather.feel}</span>
                <span class="unit">&#x2103;</span>
            </div>
            <div>
                <label for="high">High:</label>
                <span class="high" class="temperature">${weather.high}</span>
                <span class="unit">&#x2103;</span>
            </div>
            <div>
                <label for="low">Low:</label>
                <span class="low" class="temperature">${weather.low}</span>
                <span class="unit">&#x2103;</span>
            </div>
        </div>
    </div>
    <div class="other-details">
        <div class="left">
            <div>
                <img src="./images/weather-windy.png" alt="wind icon" />
                <label for="wind">Wind speed</label>
                <span class="wind">${weather.wind}</span>
            </div>
            <div>
                <img src="./images/water-percent.png" alt="humidity icon" />
                <label for="humidity">Humidity</label>
                <span classid="humidity">${weather.humidity}</span>
            </div>
        </div>
        <div class="right">
            <div>
                <img src="./images/weather-sunset-up.png" alt="sunrise icon" />
                <label for="up">Sunrise</label>
                <span class="up">${weather.up}</span>
            </div>
            <div>
                <img src="./images/weather-sunset-down.png" alt="sunset icon" />
                <label for="down">Sunset</label>
                <span class="down">${weather.down}</span>
            </div>
        </div>
    </div>
    `;

    forecastWindow.innerHTML = 
    forecast.map(item=>
        `
        <div class="card">
                <div>
                    <h2>${item.date}</h2>
                    <p>${item.main}</p>
                </div>
            <img src=${item.icon} alt="sunrise icon" />
            <p>High: ${item.high} &#x2103;</p>
            <p>Low: ${item.low} &#x2103;</p>
        </div>
        `
    ).join('');
};

displayWeatherInformation();