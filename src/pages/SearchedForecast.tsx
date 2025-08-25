import { useSearchParams } from "react-router";
import FiveDayForecast from "./FiveDayForecast";
import {useFavorites} from "../providers/FavoritesProvider";
import {useState, useEffect} from "react";

const SearchedForecast = () => {
    const [searchParams] = useSearchParams();
    const query: string | null = searchParams.get("query");
    const { addCity } = useFavorites();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setError("");
    }, [query]);

    return (
        <div className="flex flex-col gap-4">
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <>
                    <FiveDayForecast query={query} onError={setError} />
                    <div className="flex justify-center items-center">
                        <button onClick={() => addCity(query)} className="bg-blue-300 p-3 rounded-2xl">
                           Add to Favorites
                        </button>
                    </div>
                </>
            )}
        </div>

    );
};

export default SearchedForecast;