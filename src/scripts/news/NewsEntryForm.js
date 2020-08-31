import { saveNews } from "./NewsProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".newsFormContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNews") {
        const newsTitle = document.querySelector("#news--title")
        const newsSynopsis = document.querySelector("#news--synopsis")
        const newsURL = document.querySelector("#news--URL")
        const newsDate = new Date().toLocaleDateString()
        

        if (newsTitle.value != "" 
        && newsSynopsis.value != "" 
        && newsDate.value != ""
        && newsURL.value != ""
        ){

        const newNews = {
            title: newsTitle.value,
            synopsis: newsSynopsis.value,
            url: newsURL.value,
            date: newsDate
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
            <label for="news--title">Article Title</label>
            <input type="text" id="news--title" placeholder ="" />
            <textarea id="news--synopsis" placeholder="Enter a Brief Synopsis"></textarea>
            <input id="news--URL" placeholder="Enter a URL"></input>
            
            <button id="saveNews">Save Article</button>
        </div>`
}

export const NewsForm = () => {
    render()
}

