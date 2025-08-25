import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FiveDayForecast from '../pages/FiveDayForecast';
import Favorites from '../pages/Favorites';
import Navbar from '../components/Navbar';
import CurrentLocation from '../pages/CurrentLocation';
import SearchedForecast from "../pages/SearchedForecast";
import FavoritesProvider from "../providers/FavoritesProvider";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <FavoritesProvider>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route index element={<CurrentLocation />} />
                        <Route path="current" element={<CurrentLocation />} />
                        <Route path="/fiveDayForecast" element={<FiveDayForecast />} />
                    </Route>
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/searchedForecast" element={<SearchedForecast />} />
                </Routes>
            </FavoritesProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;