import * as React from "react";
import {WEATHER_IMAGE_URL} from "../config/apiConfig";

interface DaysForecastProps {
    days: number[];
    fiveDayForecast: {
        list: {
            dt_txt: string;
            main: {
                temp: number;
            };
            weather: {
                icon: string;
            }[];
        }[];
    };
    selectedDayIndex: number | null;
    setSelectedDayIndex: (index: number) => void;
    convertTemp: (temp: number) => string;
}

const DaysForecast: React.FC<DaysForecastProps> = ({days,fiveDayForecast,selectedDayIndex,setSelectedDayIndex,convertTemp}) => {
    return (
        <div className="flex justify-between gap-6">
            {days.map((value,index) => {
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
                            temperature: {convertTemp(fiveDayForecast.list[value].main.temp)}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default DaysForecast;