import * as React from "react";
import {WEATHER_IMAGE_URL} from "../config/apiConfig";
import type { DaysForecastProps } from '../constants'

const DaysForecast: React.FC<DaysForecastProps> = ({days, fiveDayForecast, selectedDayIndex, setSelectedDayIndex, convertTemp}) => {
    return (
        <div className="flex justify-between gap-6">
            {days.slice(0, 5).map((value,index) => {
                const endIndex = days.length - 1 !== index ? days[index + 1] : fiveDayForecast.list.length;

                const dayItems = fiveDayForecast.list.slice(value, endIndex);

                const temps = dayItems.map(item => item.main.temp);
                const minTemp = Math.min(...temps);
                const maxTemp = Math.max(...temps);

                const iconId = dayItems[0].weather[0].icon;
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
                        <div className="flex gap-10">
                            <div>
                                <p>
                                    Min
                                </p>
                                <p className="text-xl font-bold">
                                    {convertTemp(minTemp)}
                                </p>
                            </div>
                            <div>
                                <p>
                                    Max
                                </p>
                                <p className="text-xl font-bold">
                                    {convertTemp(maxTemp)}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DaysForecast;