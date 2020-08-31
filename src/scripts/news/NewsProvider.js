const eventHub = document.querySelector(".container")

let news = []

const dispatchStateChangeEvent = () => {
    const newsStateChangedEvent = new CustomEvent("newsStateChanged")
    eventHub.dispatchEvent(newsStateChangedEvent)
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

window.addEventListener("storage", () => {
    const event = localStorage.getItem("event")
    
    if (event === "newsChanged"){
        localStorage.clear()
        getNews()
        .then(() => {
            dispatchStateChangeEvent()
        })

    }
})