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
       localStorage.setItem("event", "newsChanged")

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
            return allNews.find(news => {
                if (news.userId === relationship.friendId || news.userId === relationship.userId){
                    if (news.userId != currentUserId){
                    return news
                    }
                }
            })
        })

        const friendNews = foundNews.filter(stories => {
            if (stories != undefined){
                return stories
            }
        })

        const userNews = allNews.filter(stories => {
            if (stories.userId === currentUserId) {
                return stories
            }
        })
        render(friendNews, userNews)
        })

    })
    })
    }     

    const render = (friendNews, userNews) => {
        let itemHTML = ""
    userNews.map(item => {
        itemHTML += NewsHTMLConverter("yours", item)
    })
    friendNews.map(item => {
        itemHTML += NewsHTMLConverter("theirs", item)
    })
        contentTarget.innerHTML = itemHTML
    }