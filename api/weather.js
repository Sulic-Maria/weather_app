const getWeatherByCity = async (city) => {
    try {
        const request = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4582435a7f2223f287d52a8bb97ca5e6&units=metric`,
            { mode: "cors" }
        );
        const response = await request.json();

        // console.log(response)

        return response
    } catch(err) {
        console.log(err);
    }
};

export { getWeatherByCity };
