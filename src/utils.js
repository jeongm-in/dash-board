// format icon identifier into openweathermap icon links 
export const getIconURL = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}.png`
}

export const roundToNearest = (temp) => {
    return Math.round(temp);
}

// update unit text depending on the configuration from env
export const displayTempUnit = () => {
    if (process.env.REACT_APP_UNIT === "metric") {
        return "°C"
    } else if (process.env.REACT_APP_UNIT === "imperial") {
        return "°F"
    } else {
        return "K"
    }
}