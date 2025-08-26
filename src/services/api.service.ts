import {apiUrls} from "../config/apiConfig";

class ApiService {
    constructor() {
    };

    async getWeatherByCity(city: string) {
        const finalUrl = `${apiUrls.WEATHER_API}&q=${city}`;

        try {
            const res = await fetch(finalUrl);
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Weather: ${error}`);
            throw new Error('Failed to fetch weather api');
        }
    };


    async getFiveDayForecast(query:string, units: string) {
        const daysUrl = `${apiUrls.FIVE_DAY_API}&q=${query}&units=${units}`;

        try {
            const res = await fetch(daysUrl);
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`FiveDayForecast: ${error}`);
            throw new Error('Failed to fetch FiveDayForecast api')

        }
    }
}

const apiService = new ApiService();

export default apiService;

