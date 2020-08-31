import { useNews, getNews, editNews } from "./NewsProvider.js"

const eventHub = document.querySelector(".container")


let capturedId = 0

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editNews--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        capturedId = id
    render(id)
    }
})   

const render = (id) => {
    const contentTarget = document.querySelector(`.newsCard--${id}`)
    contentTarget.innerHTML = `
        <span class="editContainer--${id}">
        <input type="text" class="news--title--${id}" placeholder ="Enter a New Title for the Story" />
        <textarea class="news--synopsis--${id}" placeholder="Enter a New Synopsis"></textarea>
        <textarea class="news--URL--${id}" placeholder="Enter a New URL"></textarea>
        <input type="date" class="news--date--${id}">
        <button class="buttonSpace" id="saveEditedArticle--${id}">Save Changes</button>
        </span>`
}

    eventHub.addEventListener("click", clickEvent => {
        if(clickEvent.target.id.startsWith("saveEditedArticle--")){
            const [prompt, eventId] = clickEvent.target.id.split("--")
            const editedTitle = document.querySelector(`.news--title--${eventId}`)
            const editedSynopsis = document.querySelector(`.news--synopsis--${eventId}`)
            const editedURL = document.querySelector(`.news--URL--${eventId}`)
            const editedDate = document.querySelector(`.news--date--${eventId}`)
            console.log(editedTitle.value)
            const newsUser = parseInt(sessionStorage.getItem("activeUser"))
                if (editedTitle.value != "" 
                && editedSynopsis.value != "" 
                && editedDate.value != ""
                && editedURL.value != ""
                ){
            getNews()
            .then(() => {
            const allNews = useNews()
            const foundNews = allNews.find(findNews => findNews.id === parseInt(capturedId))
            foundNews.title = editedTitle.value
            foundNews.synopsis = editedSynopsis.value
            foundNews.url = editedURL.value
            foundNews.date = editedDate.value
            foundNews.userId = newsUser
            editNews(foundNews)
            localStorage.setItem("event", "newsChanged")

        })  
    }
    else{window.alert("One or more of your entry fields is blank.")}
}
})