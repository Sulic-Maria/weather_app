// Create a weather object with necessary data from the response
const createWeatherObject = (response) => {
    const information = {
        icon: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
        main: response.weather[0].description,
        country: response.sys.country + ", ",
        region: response.name,
        temp: response.main.temp,
        feel: response.main.feels_like,
        high: response.main.temp_max,
        low: response.main.temp_min,
        wind: response.wind.speed + " m/s",
        humidity: response.main.humidity + " %",
        up: sunSetRis(response.sys.sunrise),
        down: sunSetRis(response.sys.sunset),
        date: dayMonthFormat(response.dt),
    };
    return information;
};

// Process Sunrise and Sundown times
const sunSetRis = (dateString) => {
    let date = new Date(dateString * 1000);
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour.toString().length === 1) {
        hour = "0" + hour;
    }
    let time = hour + ":" + minute;
    return time;
};

const dayMonthFormat = (timestamp) => {
    // Convert the timestamp to milliseconds (Unix timestamp is in seconds)
    const milliseconds = timestamp * 1000;

    // Create a new Date object using the milliseconds
    const date = new Date(milliseconds);

    // Get day and month from the date object
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month

    // Create the "dd.mm" formatted string
    const formattedDate = `${day}.${month}`;

    return formattedDate;
}

export { createWeatherObject }
