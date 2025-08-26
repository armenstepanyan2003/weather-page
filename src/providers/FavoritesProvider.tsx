import * as React from "react";
import {createContext, type FC, useContext, useEffect, useState} from "react";

interface IFavoriteContext {
    cities: string[];
    setCities: React.Dispatch<React.SetStateAction<string[]>>;
    addCity: (city: string) => void;
}

interface IFavoritesProvider {
    children: React.ReactNode;
}

export const FavoriteProviderContext = createContext<IFavoriteContext | null>(null);

const FavoritesProvider: FC<IFavoritesProvider> = ({ children }) => {
    const [cities, setCities] = useState<string[]>(() => {
        const stored = localStorage.getItem("favoriteCities");
        return stored ? JSON.parse(stored) : ["Paris", "London", "Moscow"];
    });

    useEffect(() => {
        localStorage.setItem("favoriteCities", JSON.stringify(cities));
    }, [cities]);

    const addCity = (city: string) => {
        const cityLower = city.toLowerCase()
        const check = cities.some(city => city.toLowerCase() === cityLower)

        if(!check) {
            setCities(prevState => [...prevState, city]);
        } else return city;
    };

    return (
        <FavoriteProviderContext.Provider value={{
            cities,
            setCities,
            addCity
        }}>
            {children}
        </FavoriteProviderContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoriteProviderContext);
    if (!context) {
        throw new Error("useFavorites not found");
    }
    return context;
}

export default FavoritesProvider;