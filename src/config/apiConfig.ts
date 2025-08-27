export const apiUrls = { // TODO: API_PATH
    WEATHER_API: `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
    FIVE_DAY_API: `https://api.openweathermap.org/data/2.5/forecast?appid=${import.meta.env.VITE_WEATHER_API_KEY}`
};


export const WEATHER_IMAGE_URL = "https://openweathermap.org/img/wn/[iconId]@2x.png";