import { useEffect, useState } from "react";
import apiService from "../services/api.service";
import { WEATHER_IMAGE_URL } from "../config/apiConfig";
import {useTemperatureProvider} from "../providers/TemperatureProvider";

interface WeatherData {
    weather: {
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
    };
    wind: {
        speed: number;
    };
}

const CurrentLocation = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const {unit} = useTemperatureProvider();

    const convertTemp = (kelvin: number) => {
        const celsius = kelvin - 273.15;
        return unit === "C"
            ? `${Math.round(celsius)}°C`
            : `${Math.round(celsius * 9/5 + 32)}°F`;
    };

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
        fetchWeather().catch(console.error);
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    if (!weatherData) return null;
    const iconId = weatherData.weather[0].icon;
    const iconUrl = WEATHER_IMAGE_URL.replace("[iconId]", iconId);

    return (
        <div className="flex justify-center mt-10">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl shadow-lg w-72 text-white text-center">
                <h2 className="text-2xl font-bold mb-3">Yerevan</h2>
                <img src={iconUrl} alt="weather" className="mx-auto w-20 h-20 mb-3"/>
                <p className="text-lg font-semibold mb-1">temperature:{convertTemp(weatherData.main.temp)}</p>
                <p className="capitalize mb-2">{weatherData.weather[0].description}</p>
                <p className="text-sm">wind speed-{weatherData.wind.speed}</p>
            </div>
        </div>
    );
};

export default CurrentLocation;