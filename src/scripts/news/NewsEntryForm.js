import { saveNews } from "./NewsProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".newsFormContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNews") {
        const newsTitle = document.querySelector("#news--title")
        const newsSynopsis = document.querySelector("#news--synopsis")
        const newsURL = document.querySelector("#news--URL")
        const newsDate = document.querySelector("#news--date")
        if (newsTitle.value != "" 
        && newsSynopsis.value != "" 
        && newsDate.value != ""
        && newsURL.value != ""
        ){

        const newNews = {
            title: newsTitle.value,
            synopsis: newsSynopsis.value,
            url: newsURL.value,
            date: newsDate.value
        }

        saveNews(newNews)
        render()
}
else(window.alert("One or more of your entry fields is blank."))
}
})

const render = () => {
    contentTarget.innerHTML = `
        <div class="newArticleForm">
            <h3> Save a new Article </h3>
            <input type="text" id="news--title" placeholder ="Enter a Title for the Story" />
            <textarea id="news--synopsis" placeholder="Enter a Brief Synopsis"></textarea>
            <input id="news--URL" placeholder="Enter a URL"></input>
            <input type="date" id="news--date">
            <button id="saveNews">Save News</button>
        </div>`
}

export const NewsForm = () => {
    render()
}