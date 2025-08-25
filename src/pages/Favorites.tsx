import {useState} from "react";
import FiveDayForecast from "./FiveDayForecast";
import {useFavorites} from "../providers/FavoritesProvider";

const Favorites = () => {
    const [selectedCityIndex, setSelectedCityIndex] = useState<number | null>(null);
    const { cities, setCities } = useFavorites();

    const handleDelete = (indexToRemove: number) => {
        const newCities = cities.filter((_, id:number) => id !== indexToRemove);
        setCities(newCities);

        if (selectedCityIndex === indexToRemove) {
            setSelectedCityIndex(null);
        } else if (selectedCityIndex !== null && selectedCityIndex > indexToRemove) {
            setSelectedCityIndex(selectedCityIndex - 1);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
                Choose a city for forecast
            </h2>
            <div className="flex justify-center flex-wrap gap-6">
                {cities.map((value, index) => (
                    <div key={index} className="relative">
                        <button
                            onClick={() => setSelectedCityIndex(index)}
                            className={`
                                px-8 py-4 rounded-xl font-semibold text-lg transition 
                                shadow-md hover:shadow-lg transform hover:scale-105 
                                focus:outline-none focus:ring-4 focus:ring-blue-400
                                ${selectedCityIndex === index ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-400 text-white'}
                            `}
                        >
                            {value}
                        </button>
                        <button
                            onClick={() => handleDelete(index)}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                            aria-label={`Delete ${value}`}
                        >
                            &times;
                        </button>
                    </div>
                ))}

            </div>
            <div className="mt-10">
                {selectedCityIndex !== null && (
                    <FiveDayForecast query={cities[selectedCityIndex]} />
                )}
            </div>
        </div>

    );
};

export default Favorites;