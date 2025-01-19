import { useState } from "react";

const Weather = () => {
    const API_key = "4b9b8688eca407ea3546cf525c8f03cb";

    const [city, setCity] = useState("");
    const [weatherDetails, setWeatherDetails] = useState({currentTemp: "", feelsLike: "", maxTemp: "", minTemp: "",
        humidity: "", pressure: "", weatherDescription: "", windDeg: "", windSpeed: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(city);
        getResponse(city);
    }

    async function getLatLon(city) {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`
        )

        if (!response.ok) {
            console.log("Error from Geo coding API");
        }

        const data = await response.json();
        let result = JSON.stringify(data);
        result = JSON.parse(result);
        console.log(result[0].lat);
        console.log(result[0].lon);

        return [(result[0].lat).toString(), (result[0].lon).toString()]
    }

    async function getResponse(city) {
        const latLon = await getLatLon(city);

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latLon[0]}&lon=${latLon[1]}&appid=${API_key}&units=metric`
        )

        if (!response.ok) {
            console.log("Error from weather API");
        }

        const data = await response.json();
        let result = JSON.stringify(data);
        result = JSON.parse(result);
        setWeatherDetails({
            currentTemp: result.main.temp,
            feelsLike: result.main.feels_like,
            maxTemp: result.main.temp_max,
            minTemp: result.main.temp_min,
            humidity: result.main.humidity,
            pressure: result.main.pressure,
            weatherDescription: result.weather[0].description,
            windDeg: result.wind.deg,
            windSpeed: result.wind.speed
        })
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder={"City Name"} onChange={(event) => setCity(event.target.value)} type="text" />
                <button type="submit">Get Weather</button>
            </form>
            <br />
            <p>Current Temperature: {weatherDetails.currentTemp}</p><br />
            <p>Feels Like: {weatherDetails.feelsLike}</p><br />
            <p>Maximum Temperature: {weatherDetails.maxTemp}</p><br />
            <p>Minimum Temperature: {weatherDetails.minTemp}</p><br />
            <p>Humidity: {weatherDetails.humidity}</p><br />
            <p>Pressure: {weatherDetails.pressure}</p><br />
            <p>Weather Description: {weatherDetails.weatherDescription}</p><br />
            <p>Wind Degree: {weatherDetails.windDeg}</p><br />
            <p>Wind Speed: {weatherDetails.windSpeed}</p><br />
        </>
        
    )
}

export default Weather;