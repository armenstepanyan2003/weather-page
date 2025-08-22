export const apiUrls = {
    WEATHER_API: `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
    QUOTE_API: "https://zenquotes.io/api/quotes",
    FACTS_API: "https://uselessfacts.jsph.pl/api/v2/facts/random",
};


export const WEATHER_IMAGE_URL = "https://openweathermap.org/img/wn/[iconId]@2x.png";