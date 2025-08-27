import * as React from 'react'
import {createContext, type FC} from "react";
import {useState} from "react";
import {useContext} from "react";

export enum TemperatureUnits {
    CELSIUS = "C",
    FAHRENHEIT = "F",
}

interface ITemperatureContext {
    unit: TemperatureUnits;
    setUnit: (unit: TemperatureUnits) => void;
}

interface ITemperatureProvider {
    children: React.ReactNode;
}

export const TemperatureProviderContext = createContext<ITemperatureContext | undefined>(undefined)

const TemperatureProvider: FC<ITemperatureProvider> = ({children}) => {
    const [unit, setUnit] = useState<TemperatureUnits>(TemperatureUnits.CELSIUS)

    return (
        <TemperatureProviderContext.Provider value={{unit, setUnit}}>
            {children}
        </TemperatureProviderContext.Provider>
    );
};

export const useTemperatureProvider = () => {
    const context = useContext(TemperatureProviderContext);
    if(!context){
        throw new Error("useTemperatureProvider not found")
    }
    return context
};

export default TemperatureProvider;