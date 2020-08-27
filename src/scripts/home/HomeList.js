import { getNews, useNews, deleteNews, getWeatherData, useWeatherData} from "./HomeProvider.js"
import { NewsHTMLConverter } from "./HomeHTMLGenerator.js"

const contentTarget = document.querySelector(".newsContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("newsStateChanged", customEvent => {
    NewsList()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNews--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
       deleteNews(id)
    }
})

export const NewsList = () => {
    getWeatherData()
    .then(() => {
    getNews()
        .then(() => {
            const allNews = useNews()
            render(allNews)
        })
    })
    }     

    const render = (newsArray) => {
        let itemHTML = ""
        newsArray.map(item => {
        itemHTML += NewsHTMLConverter(item)
    })
        contentTarget.innerHTML = itemHTML
    }