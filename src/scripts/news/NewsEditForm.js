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
        <input type="text" class="news--title" placeholder ="Enter a New Title for the Story" />
        <textarea class="news--synopsis" placeholder="Enter a New Synopsis"></textarea>
        <textarea class="news--URL" placeholder="Enter a New URL"></textarea>
        <input type="date" class="news--date">
        <button class="buttonSpace" id="saveEditedArticle">Save Changes</button>
        </span>`
}

    eventHub.addEventListener("click", clickEvent => {
            const editedTitle = document.querySelector(".news--title")
            const editedSynopsis = document.querySelector(".news--synopsis")
            const editedURL = document.querySelector(".news--URL")
            const editedDate = document.querySelector(".news--date")
            let newsUserId = parseInt(sessionStorage.getItem("activeUser"))
            if (clickEvent.target.id === ("saveEditedArticle")) {
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
            foundNews.userId = newsUserId
            
            editNews(foundNews)
        })  
    }
    else{window.alert("One or more of your entry fields is blank.")}
}
})