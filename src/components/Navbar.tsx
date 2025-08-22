import { NavLink  } from 'react-router-dom';

function Navbar() {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-black'
            : 'hover:underline';
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-center gap-6">
            <NavLink  to="/" className={linkClasses}>Home</NavLink >
            <NavLink  to="/fiveDayForecast" className={linkClasses}>FiveDayForecast</NavLink>
            <NavLink  to="/favorites"  className={linkClasses}>Favorites</NavLink >
        </nav>
    );
}

export default Navbar;