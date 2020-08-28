import {useWeatherData } from "./WeatherProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".weatherContainer")

eventHub.addEventListener("forecastHasBeenCaptured", customEvent => {
    contentTarget.innerHTML = "";
    FilterWeather()
})

export const FilterWeather = () => {
    let weatherData = useWeatherData()
    const fiveDayForecast = weatherData.filter(weather => {
          if (weather.dt_txt.split(" ")[1] === "00:00:00") {
                return true
          }
    })
    showForecast(fiveDayForecast)
}

export const getDayOfTheWeek = (weather) => {
    const date = new Date(weather.dt * 1000);
    const daysOfTheWeek = [
          'SUN',
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
          'SAT'
    ]
    const day = date.getDay()
    return daysOfTheWeek[day]
}

export const showForecast = (fiveDayForecast) => {
    contentTarget.innerHTML = fiveDayForecast.map((thisDay) => {
          return `
                <div class="forecast--card">
                      <div class="heading heading--forecast-card">
                            ${getDayOfTheWeek(thisDay)}
                      </div>
                      <div class="forecast-card--details">
                            <span class="forecast-card--image">
                                  <img class="image forecast-image" src="http://openweathermap.org/img/wn/${thisDay.weather[0].icon}@2x.png">
                            </span>
                            <span class="temp--high">
                                  ${Math.round(thisDay.main.temp_max)}&deg; F
                            </span>
                            <span class="temp--low">
                                  ${Math.round(thisDay.main.temp_min)}&deg; F
                            </span>
                      </div>
                </div>
          `
    }).join("")
    eventHub.addEventListener("forecastHasBeenCaptured", customEvent => {
    FilterWeather()
    })
}