const eventHub = document.querySelector(".container")

let news = []
let forecast = []

const dispatchStateChangeEvent = () => {
    const newsStateChangedEvent = new CustomEvent("newsStateChanged")
    eventHub.dispatchEvent(newsStateChangedEvent)
}

const dispatchForecastCaptured = () => {
    const forecastCaptured = new CustomEvent("forecastHasBeenCaptured")
    eventHub.dispatchEvent(forecastCaptured)
}

export const useNews = () => {
    return news.slice()
}

export const getNews = () => {
    return fetch('http://localhost:8088/news')
        .then(response => response.json())
        .then(parsedNews => {
            news = parsedNews
        })
}

export const saveNews = (news) => {
    const jsonNews = JSON.stringify(news)

    return fetch('http://localhost:8088/news', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonNews
})
.then(getNews)
.then(dispatchStateChangeEvent)
}

export const deleteNews = news => {
    return fetch(`http://localhost:8088/news/${news}`, {
        method: "DELETE"
    })
        .then(getNews)
        .then(dispatchStateChangeEvent)
}

export const editNews = (news) => {
    return fetch(`http://localhost:8088/news/${news.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(news)
    }).then(getNews)
    .then(dispatchStateChangeEvent)
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
