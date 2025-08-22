import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FiveDayForecast from '../pages/FiveDayForecast';
import Favorites from '../pages/Favorites';
import Navbar from '../components/Navbar';

 function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fiveDayForecast" element={<FiveDayForecast />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;