import { useNews, getNews, editNews, getWeatherData, useWeatherData } from "./HomeProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".editNewsContainer")

let capturedId = 0

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editNews--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        capturedId = id
    render()
    }
})   

const render = () => {
    contentTarget.innerHTML = `
        <span class=editContainer>
        <textarea class="edit--content" placeholder="Edit Your Text Here"></textarea>
        <button class="buttonSpace" id="saveEditedArticle">Save Changes</button>
        </span>`
}

    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === ("saveEditedArticle")) {
            const editedText = document.querySelector(".edit--content")
            getNews()
            .then(() => {
            const allNews = useNews()
            const foundNews = allNews.find(findNews => findNews.id === parseInt(capturedId))
            foundNews.synopsis = editedText.value
            editNews(foundNews)
        })
    }})