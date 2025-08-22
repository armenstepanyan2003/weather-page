import {apiUrls} from "../config/apiConfig.ts";

class ApiService {
    constructor() {
    }

    async getWeatherByCity(city) {
        const finalUrl = `${apiUrls.WEATHER_API}&q=${city}`;

        try {
            const res = await fetch(finalUrl);
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(`Weather: ${error}`);
            throw new Error('Failed to fetch weather api');
        }
    }



    // async getAllCitesData (cities) {
    //     return Promise.all(cities.map((city) => {
    //         return this.getWeatherByCity(city);
    //     }));
    // };
}

const apiService = new ApiService();

export default apiService;