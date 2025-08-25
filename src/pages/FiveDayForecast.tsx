import * as React from "react";
import { useEffect, useState } from "react";
import apiService from "../services/api.service";
import { WEATHER_IMAGE_URL } from "../config/apiConfig";

interface Weather {
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    humidity: number;
}

interface Wind {
    speed: number;
}

interface ForecastItem {
    dt_txt: string;
    weather: Weather[];
    main: Main;
    wind: Wind;
}

interface FiveDayForecastData {
    cod: string;
    list: ForecastItem[];
}

interface FiveDayForecastProps {
    query?: string;
    onError?: (message: string) => void;
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ query = "Yerevan", onError}) => {
    const [fiveDayForecast, setFiveDayForecast] = useState<FiveDayForecastData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error] = useState<string>("");
    const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

    // const days = {
    //     day1: 0,
    //     day2: 8,
    //     day3: 16,
    //     day4: 24,
    //     day5: 32,
    // };

    const daysArr = Array.from({ length: 5 }).map((_, i) => i * 8);
    console.log(daysArr);


    useEffect(() => {
        const fetchFiveDay = async () => {
            setLoading(true);
            try {
                const data = await apiService.getFiveDayForecast(query);

                if (data.cod === "404") {
                    onError?.("The city was not found.");
                    setFiveDayForecast(null);
                } else {
                    setFiveDayForecast(data);
                    onError?.("");
                }
            } catch (e) {
                console.error(e);
                onError?.("Failed to load weather.");
            } finally {
                setLoading(false);
            }
        };

        fetchFiveDay().catch(console.error);
    }, [query, onError]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!fiveDayForecast) return null;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Weather forecast for <span className="text-blue-600">{query}</span>
            </h3>
            <div className="flex justify-between gap-6">
                {daysArr.map((value,index) => {
                    console.log('value, index', value,index);
                    const iconId = fiveDayForecast.list[value].weather[0].icon;
                    return (
                        <div
                            key={value}
                            onClick={() => setSelectedDayIndex(index)}
                            className={`
                                flex flex-col items-center cursor-pointer rounded-2xl p-5 w-44 
                                bg-gradient-to-b from-sky-400 to-sky-600 
                                shadow-md hover:shadow-xl hover:scale-105 transform transition 
                                duration-300 text-white
                                ${selectedDayIndex === index ? "ring-4 ring-blue-400" : ""}
                            `}
                        >
                            <p className="text-sm text-gray-100 mb-1 font-semibold">
                                {new Date(fiveDayForecast.list[value].dt_txt).toDateString()}
                            </p>
                            <img
                                src={WEATHER_IMAGE_URL.replace("[iconId]", iconId)}
                                alt="iconid"
                                className="w-16 h-16 mb-3"/>
                            <p className="text-xl font-bold">
                                temperature: {Math.round(fiveDayForecast.list[value].main.temp - 273.15)}°C
                            </p>
                        </div>
                    );
                })}
            </div>

            {selectedDayIndex !== null && (
                <div className="mt-10 flex justify-around flex-wrap gap-8">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const startIndex = daysArr[selectedDayIndex] + i;
                        console.log("startIndex", startIndex);
                        const forecastItem = fiveDayForecast.list[startIndex];
                        console.log("forecastItem", forecastItem);
                        const time = new Date(forecastItem.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        console.log("time", time);
                        const tempC = Math.round(forecastItem.main.temp - 273.15);
                        const iconId = forecastItem.weather[0].icon;
                        console.log("iconId", iconId);

                        return (
                            <div
                                key={startIndex}
                                className="flex flex-col items-center p-4 w-36 bg-gradient-to-b from-indigo-400 to-indigo-700 rounded-xl shadow-lg text-white"
                            >
                                <p className="font-semibold mb-1">{time}</p>
                                <img src={WEATHER_IMAGE_URL.replace("[iconId]", iconId)} alt="weather icon"  className="w-12 h-12 mb-1" />
                                <p className="text-lg font-semibold">{tempC}°C</p>
                                <p className="text-sm capitalize">{forecastItem.weather[0].description}</p>
                                <p className="text-xs mt-2">Wind: {forecastItem.wind.speed} m/s</p>
                                <p className="text-xs">Humidity: {forecastItem.main.humidity}%</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FiveDayForecast;
