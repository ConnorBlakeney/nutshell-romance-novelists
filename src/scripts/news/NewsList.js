import { getNews, useNews, deleteNews} from "./NewsProvider.js"
import {getWeatherData } from "../weather/WeatherProvider.js"
import { NewsHTMLConverter } from "./NewsHTMLGenerator.js"
import { getUserFriends, useUserFriends} from "../users/usersDataProvider.js"

const contentTarget = document.querySelector(".newsContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("newsStateChanged", customEvent => {
    NewsList()
})

eventHub.addEventListener("userFriendsStateChanged", customEvent => {
    NewsList()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNews--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
       deleteNews(id)
    }
})

export const NewsList = () => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))
    getWeatherData()
    .then(() => {
    getNews()
    .then(() => {
    getUserFriends()
        .then(() => {
        const allNews = useNews()
        const allFriends = useUserFriends()
        const userFriends = allFriends.filter(f => {
            if(currentUserId === f.friendId || currentUserId === f.userId) {
                return f
            }
        })

        const foundNews = userFriends.map(relationship => {
            return allNews.filter(news => {
                if (news.userId === relationship.friendId || news.userId === relationship.userId){
                    if(news.userId != currentUserId){
                    return news
                    }
                }
            })
        })

        const userNews = allNews.filter(stories => {
            if (stories.userId === currentUserId) {
                return stories
            }
        })
        
        const flattenedNews = foundNews.flat(1)
        const toSort = flattenedNews.concat(userNews)
        const sortedNews = toSort.sort(
            (currentEntry, nextEntry) =>
                Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
        )
   
        render(sortedNews)
        })

    })
    })
    }     

    const render = (sortedNews) => {
        let whose = ""
        let itemHTML = ""
    sortedNews.map(item => {
        if (item.userId === parseInt(sessionStorage.getItem("activeUser"))){
        whose = "yours"
        }
        else{whose = "theirs"}
        itemHTML += NewsHTMLConverter(whose, item)
    })
        contentTarget.innerHTML = ` <h3> Articles </h3> ${itemHTML}`
    }        