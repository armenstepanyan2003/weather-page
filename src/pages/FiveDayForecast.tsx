import * as React from 'react';
import { useEffect, useState } from 'react';
import apiService from '../services/api.service';
import { useTemperatureProvider } from '../providers/TemperatureProvider';
import DaysForecast from '../components/DaysForecast';
import HourlyForecast from '../components/HourlyForecast';
import { convertTemp } from '../helpers/temperatureHelper';
import type {ForecastItem, FiveDayForecastData, FiveDayForecastProps } from '../constants'


const getDayIndexes = (list: ForecastItem[]): number[] => {
    const dayIndexes: number[] = [];
    const dates: string[] = [];

    for (let index = 0; index < list.length; index++) {
        const date = new Date(list[index].dt_txt).toDateString();

        if (!dates.includes(date)) {
            dates.push(date);
            dayIndexes.push(index);
        }
    }
    return dayIndexes;
};

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ query = 'Yerevan', onError, }) => {
    const [fiveDayForecast, setFiveDayForecast] = useState<FiveDayForecastData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error] = useState<string>('')
    const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null)
    const [days, setDays] = useState<number[]>([]);
    const { unit } = useTemperatureProvider()

    const units = unit === 'C' ? 'metric' : 'imperial'

    useEffect(() => {
        const fetchFiveDay = async () => {
            setLoading(true)

            try {
                const data = await apiService.getFiveDayForecast(query, units);

                if (data.cod === '404') {
                    onError?.('The city was not found.');
                    setFiveDayForecast(null);
                } else {
                    setFiveDayForecast(data);
                    setDays(getDayIndexes(data.list));
                    onError?.('');
                }
            } catch (e) {
                console.error(e)
                onError?.('Failed to load weather.')
            } finally {
                setLoading(false)
            }
        }

        fetchFiveDay().catch(console.error)
    }, [query, units, onError])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!fiveDayForecast) return null

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Weather forecast for{' '}
                <span className="text-blue-600">{query}</span>
            </h3>

            <DaysForecast
                days={days}
                fiveDayForecast={fiveDayForecast}
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
                convertTemp={(volume) => convertTemp(volume, unit)}
            />

            {selectedDayIndex !== null && (
                <HourlyForecast
                    days={days}
                    selectedDayIndex={selectedDayIndex}
                    fiveDayForecast={fiveDayForecast}
                    convertTemp={(volume) => convertTemp(volume, unit)}
                />
            )}
        </div>
    )
}

export default FiveDayForecast
