//author: Samantha Maas
//purpose: This module takes the data from the data provider and renders the list of Events information to the DOM. T

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
            console.log(closestDate(events))
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
        <article class="eventsList">
        <h3> Events </h3>
            ${allEventsTurnedIntoHTML}
        </article>
    `
}


//Finds the next event date from the current date
export const closestDate = (events) => {
    
    const getEventDates = events.map(event => event.date)

    const parseMDY = (s) => {
        const b = (s || '').split(/\D/)
        return new Date(b[2], b[0]-1, b[1])
    }

    const getClosestDateToToday = (arr) => {
        const now = new Date()
        now.setHours(23, 59, 59)
        return arr.reduce((acc, s) => {
            const d = parseMDY
            return d <now? acc : (acc && d > parseMDY(acc)? acc : s)
        }, null) 
    }
    return getClosestDateToToday(getEventDates)
}