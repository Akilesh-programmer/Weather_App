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

            <div className="weather">
                <h2>Weather for <span className="city">{city}</span></h2>

                <div className="weatherDetails">
                    <strong>Feels Like</strong> <div className="semiColon">:</div> <span>{weatherDetails.feelsLike}</span>
                    <strong>Current Temperature</strong> <div className="semiColon">:</div> <span>{weatherDetails.currentTemp}</span>
                    <strong>Maximum Temperature</strong> <div className="semiColon">:</div> <span>{weatherDetails.maxTemp}</span>
                    <strong>Minimum Temperature</strong> <div className="semiColon">:</div> <span>{weatherDetails.minTemp}</span>
                    <strong>Humidity</strong> <div className="semiColon">:</div> <span>{weatherDetails.humidity}</span>
                    <strong>Pressure</strong> <div className="semiColon">:</div> <span>{weatherDetails.pressure}</span>
                    <strong>Weather Description</strong> <div className="semiColon">:</div> <span>{weatherDetails.weatherDescription}</span>
                    <strong>Wind Degree</strong> <div className="semiColon">:</div> <span>{weatherDetails.windDeg}</span>
                    <strong>Wind Speed</strong> <div className="semiColon">:</div> <span>{weatherDetails.windSpeed}</span>
                </div>
                
            </div>
            
        </>
        
    )
}

export default Weather;