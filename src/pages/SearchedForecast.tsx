import { useSearchParams } from "react-router";
import FiveDayForecast from "./FiveDayForecast";
import {useFavorites} from "../providers/FavoritesProvider";
import {useState, useEffect} from "react";

const SearchedForecast = () => {
    const [searchParams] = useSearchParams();
    const query= searchParams.get("query");
    const { addCity, cities } = useFavorites();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setError("");
    }, [query]);

    if(query === null) return;
    const check = cities.some(city => city.toLowerCase() === query.toLowerCase());

    return (
        <div className="flex flex-col gap-4">
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : query ? (
                    <>
                        <FiveDayForecast query={query} onError={setError} />
                        <div className="flex justify-center items-center">
                            <button
                                onClick={() => addCity(query)}
                                disabled={check}
                                className={`px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 shadow-lg
                                    ${check
                                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                                    : "bg-blue-600 hover:bg-blue-700 active:scale-95 hover:shadow-xl"}`}
                            >
                                {check ? "Already in Favorites" : "Add to Favorites"}
                            </button>
                        </div>
                    </>
            ) : (<div>There is no query, please add and retry again.</div>)
            }
        </div>
    );
};

export default SearchedForecast;