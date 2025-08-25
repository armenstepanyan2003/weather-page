import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div className="p-5">
            <nav className="flex p-6 justify-center gap-5">
                <NavLink
                    to="current"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-600 font-semibold border-b-4 border-blue-600 pb-2 transition-colors"
                            : "text-gray-600 hover:text-blue-500 hover:border-b-4 hover:border-blue-500 pb-2 transition-colors"
                    }
                >
                    My Current Location
                </NavLink>

                <NavLink
                    to="fiveDayForecast"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-600 font-semibold border-b-4 border-blue-600 pb-2 transition-colors"
                            : "text-gray-600 hover:text-blue-500 hover:border-b-4 hover:border-blue-500 pb-2 transition-colors"
                    }
                >
                    Five Day Forecast
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
};

export default Home;