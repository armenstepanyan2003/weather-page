export const convertTemp = (volume: number, unit: 'C' | 'F'): string => {
    return `${Math.round(volume)}${unit === 'C' ? '°C' : '°F'}`;
};