import {TemperatureUnits, useTemperatureProvider} from "../providers/TemperatureProvider";

const FahrenheitCelsius = () => {
    const {unit, setUnit} = useTemperatureProvider();

    return (
        <div className="flex gap-3">
            <button
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    ${unit === TemperatureUnits.CELSIUS
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-white hover:bg-blue-400"}`}
                onClick={() => setUnit(TemperatureUnits.CELSIUS)}
            >
                °C
            </button>
            <button
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    ${unit === TemperatureUnits.FAHRENHEIT
                    ? "bg-white text-blue-600 shadow-md"
                    : "text-white hover:bg-blue-400"}`}
                onClick={() => setUnit(TemperatureUnits.FAHRENHEIT)}
            >
                °F
            </button>
        </div>
    );
};

export default FahrenheitCelsius;