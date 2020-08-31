//author: Red Tilson
//purpose: This component communicates with the external openweather.org
//api to retrieve 5-day and single day forecasts. 

let forecast = []
let singleForecast = ""
const eventHub = document.querySelector(".container")

const dispatchForecastCaptured = () => {
    const forecastCaptured = new CustomEvent("forecastHasBeenCaptured")
    eventHub.dispatchEvent(forecastCaptured)
}

export const getWeatherData = () => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast/?zip=37216&units=imperial&appid=ff3c6bcca7fa13fd3098a1ab51d93dd9`)
         .then(response => response.json())
        .then(parsedWeather => {
            forecast = parsedWeather.list
        })
        .then(useWeatherData)
        .then(dispatchForecastCaptured)
}
export const useWeatherData = () => {
      return forecast.slice()
}

export const getOneDayWeatherData = (zip) => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=ff3c6bcca7fa13fd3098a1ab51d93dd9`)
         .then(response => response.json())
        .then(parsedWeather => {
            singleForecast = parsedWeather
        })
}

export const useOneDayWeatherData = () => {
    return singleForecast
}