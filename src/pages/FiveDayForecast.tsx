import * as React from 'react';
import { useEffect, useState } from 'react';
import apiService from '../services/api.service';
import { useTemperatureProvider } from '../providers/TemperatureProvider';
import DaysForecast from '../components/DaysForecast';
import HourlyForecast from '../components/HourlyForecast';

interface Weather {
    description: string
    icon: string
}

interface Main {
    temp: number
    humidity: number
}

interface Wind {
    speed: number
}

interface ForecastItem {
    dt_txt: string
    weather: Weather[]
    main: Main
    wind: Wind
}

interface FiveDayForecastData {
    cod: string
    list: ForecastItem[]
}

interface FiveDayForecastProps {
    query?: string
    units?: string
    onError?: (message: string) => void
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({
    query = 'Yerevan',
    onError,
}) => {
    const [fiveDayForecast, setFiveDayForecast] =
        useState<FiveDayForecastData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error] = useState<string>('')
    const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(
        null
    )
    const { unit } = useTemperatureProvider()

    const units = unit === 'C' ? 'metric' : 'imperial'

    const convertTemp = (volume: number) => {
        return `${Math.round(volume)}${(unit === 'C') ? '°C' : '°F'}`;
    }

    const days = [0, 3, 11, 19, 27]

    useEffect(() => {
        const fetchFiveDay = async () => {
            setLoading(true)

            try {
                const data = await apiService.getFiveDayForecast(query, units)

                if (data.cod === '404') {
                    onError?.('The city was not found.')
                    setFiveDayForecast(null)
                } else {
                    setFiveDayForecast(data)
                    onError?.('')
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
                convertTemp={convertTemp}
            />

            {selectedDayIndex !== null && (
                <HourlyForecast
                    days={days}
                    selectedDayIndex={selectedDayIndex}
                    fiveDayForecast={fiveDayForecast}
                    convertTemp={convertTemp}
                />
            )}
        </div>
    )
}

export default FiveDayForecast
