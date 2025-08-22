import { useEffect, useState } from "react";
import apiService from "../services/api.service";
import { WEATHER_IMAGE_URL } from "../config/apiConfig";

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await apiService.getWeatherByCity("Yerevan");
                setWeatherData(data);
            } catch (e) {
                console.log(e);
                setError("Failed to load weather.");
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const iconId = weatherData.weather[0].icon;
    const iconUrl = WEATHER_IMAGE_URL.replace("[iconId]", iconId);

    return (
        <div className=" p-5">
            <div className="border border-gray-500 p-5 w-[300px] rounded-lg bg-blue-400">
                <h2>Yerevan</h2>
                <img src={iconUrl} alt="weather" />
                <p>temperature:{Math.round(weatherData.main.temp - 273.15)}°C</p>
                <p>{weatherData.weather[0].description}</p>
                <p>wind speed-{weatherData.wind.speed}</p>
            </div>
        </div>
    );
};

export default Home;