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
    const allEvents = useEvents()
    render(allEvents)
    newEventForm()
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

    friendsEvents = currentRelationships.map(r => {
        return events.find(event => {
            if(event.userId === r.userId || event.userId === r.friendId){
                return event
            }
        })
    })

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