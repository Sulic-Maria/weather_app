import { createWeatherObject } from "../utils/dataFormatting.js";

const getForecastData = async (city) => {
    try {
        const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=69518b1f8f16c35f8705550dc4161056&units=metric`);
        const response = await request.json();

        // console.log(response.list);

        return response.list;
    } catch (err) {
        console.log(err);
    }
};

const getForecastByCity = async (forecastList) => {
    try{
        const uniqueDays = new Set();
        
        const forecast = await forecastList.map(item => createWeatherObject(item))
        const uniqueForecast = forecast.filter(obj => {
            const isDuplicate = uniqueDays.has(obj.date);
            if(!isDuplicate) uniqueDays.add(obj.date);

            return !isDuplicate;
        })

        return uniqueForecast;
    } catch(err) {
        console.log(err);
    }
}

export { getForecastData, getForecastByCity };