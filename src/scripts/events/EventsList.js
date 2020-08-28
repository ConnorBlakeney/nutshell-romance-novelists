import {useEvents, getEvents} from "./EventsDataProvider.js"
import {eventHTML} from "./EventHTMLConverter.js"
import {newEventForm} from "./NewEventForm.js"
import { getUsers, getUserFriends, useUserFriends } from "../users/usersDataProvider.js"

const contentTarget = document.querySelector(".eventListContainer")
const eventHub = document.querySelector(".container")

let events = []
let userFriends = []
let friendsEvents = []

eventHub.addEventListener("eventStateChanged", customEvent => {
    events = useEvents()
    findFriends()
    render()
    newEventForm()
})
eventHub.addEventListener("userFriendsStateChanged", () => {
    userFriends = useUserFriends()
    findFriends()
    render()
    
})

export const eventsList = () => {
    getEvents()
    getUsers()
    getUserFriends()
        .then (() => {
            events = useEvents()
            userFriends = useUserFriends()
            findFriends()
            render()
        })
}

const findFriends = () => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    let currentRelationships = userFriends.filter(f => {
        if(currentUserId === f.userId || currentUserId === f.friendId ){
            return f
        }
    })

    let friendIds = currentRelationships.map(r => {
        if(r.userId === currentUserId){
            return r.friendId
        }else{
            return r.userId
        }
    })
    
    friendIds.push(currentUserId)
    

    friendsEvents = events.filter(event => friendIds.find(id => event.userId === id))

}

const render = () => {
    const allEventsTurnedIntoHTML = friendsEvents.map(event => {
        return eventHTML(event)
    }).join("")

    contentTarget.innerHTML = `
    <h2> Events </h2>
        <article class="eventsList">
            ${allEventsTurnedIntoHTML}
        </article>
    `
}