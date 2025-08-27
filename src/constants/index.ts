import * as React from 'react'

export interface Weather {
    description: string
    icon: string
}

export interface Main {
    temp: number
    humidity: number
}

export interface Wind {
    speed: number
}

export interface ForecastItem {
    dt_txt: string
    weather: Weather[]
    main: Main
    wind: Wind
}

export interface FiveDayForecastData {
    cod: string
    list: ForecastItem[]
}

export interface FiveDayForecastProps {
    query?: string
    units?: string
    onError?: (message: string) => void
}

export interface WeatherData {
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
    name: string;
}

export interface DaysForecastProps {
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

export interface HourlyForecastProps {
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

export interface IFavoriteContext {
    cities: string[];
    setCities: React.Dispatch<React.SetStateAction<string[]>>;
    addCity: (city: string) => void;
}

export interface IFavoritesProvider {
    children: React.ReactNode;
}

