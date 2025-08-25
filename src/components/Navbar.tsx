import { NavLink  } from 'react-router-dom';
import Search from "../components/Search";
import FahrenheitCelsius from "./FahrenheitCelsius";

function Navbar() {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-white bg-blue-800 rounded-md px-4 py-2 font-semibold shadow-md transition-transform transform scale-105'
            : 'text-white hover:bg-blue-500 hover:underline hover:rounded-md px-4 py-2 transition-all duration-300 ease-in-out';
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-center gap-6 items-center">
            <NavLink  to="/" className={linkClasses}>Home</NavLink >
            <NavLink  to="/favorites"  className={linkClasses}>Favorites</NavLink >
            <Search />
            <FahrenheitCelsius />
        </nav>
    );
}

export default Navbar;