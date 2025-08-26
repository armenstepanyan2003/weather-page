import { useNavigate } from "react-router-dom"
import {useState} from "react";

const Search = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/searchedForecast?query=${encodeURIComponent(query.trim())}`);
            setQuery("")
        }
    };

    return (
        <div className="flex items-center border border-gray-300 rounded overflow-hidden w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                        setQuery("");
                    }
                }}
                placeholder="Search..."
                className="flex-grow px-4 py-2 text-white placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <button
                onClick={handleSearch}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            >
                Search
            </button>
        </div>
    );
};

export default Search;