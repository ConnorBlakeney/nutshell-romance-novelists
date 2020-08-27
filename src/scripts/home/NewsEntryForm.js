import { saveNews } from "./HomeProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".newsFormContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNews") {
        const newsTitle = document.querySelector("#news--title")
        const newsSynopsis = document.querySelector("#news--synopsis")
        const newsDate = document.querySelector("#news--date")
        if (newsTitle.value != "" && newsSynopsis.value != "" && newsDate.value != ""){

        const newNews = {
            title: newsTitle.value,
            synopsis: newsSynopsis.value,
            date: newsDate.value,
        }

        saveNews(newNews)
        render()
}
else(window.alert("One of your entry fields is blank."))
}
})

const render = () => {
    contentTarget.innerHTML = `
        <input type="text" id="news--title" placeholder ="Enter a Title for the Story" />
        <textarea id="news--synopsis" placeholder="Enter a Brief Synopsis"></textarea>
        <input type="date" id="news--date">
        <button id="saveNews">Save News</button>`
}

export const NewsForm = () => {
    render()
}