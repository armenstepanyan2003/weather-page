import * as React from "react";
import {WEATHER_IMAGE_URL} from "../config/apiConfig";

interface HourlyForecastProps {
    days: number[];
    selectedDayIndex: number;
    fiveDayForecast: {
        list: {
            dt_txt: string;
            main: {
                temp: number;
                humidity: number;
            };
            weather: {
                description: string;
                icon: string;
            }[];
            wind: {
                speed: number;
            };
        }[];
    };
    convertTemp: (temp: number) => string;
}

const HourlyForecast:React.FC<HourlyForecastProps> = ({days,selectedDayIndex,fiveDayForecast,convertTemp}) => {
    return (
        <div className="mt-10 flex justify-around flex-wrap gap-8">
            {fiveDayForecast.list
                .filter((item) => {
                    const forecastDate = new Date(item.dt_txt);
                    const selectedDate = new Date(fiveDayForecast.list[days[selectedDayIndex]].dt_txt);
                    const now = new Date();

                    const sameDay =
                        forecastDate.getFullYear() === selectedDate.getFullYear() &&
                        forecastDate.getMonth() === selectedDate.getMonth() &&
                        forecastDate.getDate() === selectedDate.getDate();

                    return sameDay && forecastDate.getTime() > now.getTime();
                })
                .map((forecastItem) => {
                    const time = new Date(forecastItem.dt_txt).toLocaleTimeString('hy-AM', { hour: '2-digit', minute: '2-digit',  hour12: false });
                    const temp = convertTemp(forecastItem.main.temp);
                    const iconId = forecastItem.weather[0].icon;

                    return (
                        <div
                            key={forecastItem.dt_txt}
                            className="flex flex-col items-center p-4 bg-gradient-to-b from-indigo-400 to-indigo-700 rounded-xl shadow-lg text-white"
                        >
                            <p className="font-semibold mb-1">{time}</p>
                            <img src={WEATHER_IMAGE_URL.replace("[iconId]", iconId)} alt="weather icon" className="w-12 h-12 mb-1" />
                            <p className="text-lg font-semibold">{temp}</p>
                            <p className="text-sm capitalize">{forecastItem.weather[0].description}</p>
                            <p className="text-xs mt-2">Wind: {forecastItem.wind.speed} m/s</p>
                            <p className="text-xs">Humidity: {forecastItem.main.humidity}%</p>
                        </div>
                    );
                })}
        </div>
    );
};

export default HourlyForecast;