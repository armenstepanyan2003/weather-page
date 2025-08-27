import { useEffect, useState } from "react";
import apiService from "../services/api.service";
import { WEATHER_IMAGE_URL } from "../config/apiConfig";
import {useTemperatureProvider} from "../providers/TemperatureProvider";
import { convertTemp } from '../helpers/temperatureHelper';
import type { WeatherData } from '../constants'

const CurrentLocation = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const {unit} = useTemperatureProvider();

    const units = unit === 'C' ? 'metric' : 'imperial';

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await apiService.getWeatherByCity("Yerevan", units);
                setWeatherData(data);
            } catch (e) {
                console.log(e);
                setError("Failed to load weather.");
            } finally {
                setLoading(false);
            }
        };
        fetchWeather().catch(console.error);
    }, [units]);

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    if (!weatherData) return null;
    const iconId = weatherData.weather[0].icon;
    const iconUrl = WEATHER_IMAGE_URL.replace("[iconId]", iconId);

    return (
        <div className="flex justify-center mt-10">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl shadow-lg w-72 text-white text-center">
                <h2 className="text-2xl font-bold mb-3">{weatherData.name}</h2>
                <img src={iconUrl} alt="weather" className="mx-auto w-20 h-20 mb-3" />
                <p className="text-lg font-semibold mb-1">{convertTemp(weatherData.main.temp, unit)}</p>
                <p className="capitalize mb-2">{weatherData.weather[0].description}</p>
                <p className="text-sm">wind speed: {weatherData.wind.speed}</p>
            </div>
        </div>
    );
};

export default CurrentLocation;