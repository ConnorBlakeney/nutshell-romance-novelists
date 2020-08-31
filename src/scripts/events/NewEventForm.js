//author: Samantha Maas
//purpose: This module renders the form to the DOM that a user to can input new information about an event. This module also has an event listener that updates the database with the new event added. You can also see the edit eventlistener in this module as well.

import { useEvents, saveEvent, editEvent } from "./EventsDataProvider.js"
import {getOneDayWeatherData, useOneDayWeatherData} from "../weather/WeatherProvider.js"

const contentTarget = document.querySelector(".eventFormContainer")
const weatherTarget = document.querySelector(".eventWeatherContainer")
const eventHub = document.querySelector(".container")

//eventListener that is listening for the Edit Event Button to be clicked and then it is displaying the information from that event in the form for updating. 
eventHub.addEventListener("editEventButtonClicked", customEvent => {
    const allEvents = useEvents()
    const eventId = event.detail.eventId
    const eventObj = allEvents.find(event => event.id === eventId)

    const eventName = document.querySelector("#event--name")
    const eventDate = document.querySelector("#event--date")
    const eventTime = document.querySelector("#event--time")
    const eventLocation = document.querySelector("#event--location")
    const eventZip= document.querySelector("#event--zip")
    const eventDescription = document.querySelector("#event--description")
    const id = document.querySelector("#eventId")

    eventName.value = eventObj.name
    eventDate.value = eventObj.date
    eventTime.value = eventObj.time
    eventLocation.value = eventObj.location
    eventZip.value = eventObj.zip
    eventDescription.value = eventObj.description
    id.value = eventId
})

eventHub.addEventListener("showWeatherButtonClicked", customEvent => {
    const eventId = event.detail.eventId
    const allEvents = useEvents()
    const eventObj = allEvents.find(event => event.id === eventId)
    const eventZip = eventObj.zip
    getOneDayWeatherData(eventZip).then(() => {
       const eventWeather = useOneDayWeatherData()
       renderWeather(eventWeather)
       console.log(eventWeather)
    })

})

//This function renders the HTML representation of the form to the DOM
export const newEventForm = () => {
    render()
}

const renderWeather = (weather) => {
    weatherTarget.innerHTML = `
    <section class="eventWeatherForm">
        <div>${weather.name}</div>
        <div>${weather.weather[0].main}</div>
        <div>${weather.main.temp_max}</div>
    </section>
    `
}

const render = () => {
    contentTarget.innerHTML = `
    <section class="newEventForm">
        <h3> Create a new event </h3>
        <input type="text" id="event--name" placeholder="Enter event name"/>
        <label for="event--date">Event Date</label>
        <input type="date" name="eventDate" id="event--date"/>
        <label for="event--time">Event Time</label>
        <input type="time" name="eventTime" id="event--time"/>
        <input type="text" id="event--location" placeholder="Enter event location"/>
        <input type="text" id="event--zip" placeholder="Enter zipcode for event"/>
        <textarea id="event--description" placeholder="Event Description"></textarea>

        <button id="saveEventButton"> Save Event </button>
        <input type="hidden" name="eventId" id="eventId" value="">
    </section>
    `
}

//eventListener that listens for the "Save Button" and updates the database with the new event information
//this eventListener also updates an event in the database if it is being edited
eventHub.addEventListener("click", clickEvent => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))
    if (clickEvent.target.id === "saveEventButton") {
        const eventName = document.querySelector("#event--name")
        const eventTime = document.querySelector("#event--time")
        const newEventTime = eventTime.value.split(":")
        let hours = newEventTime[0]
        let minutes = newEventTime[1]
        let meridian = ""

        if (hours > 12) {
            meridian = 'PM'
            hours -= 12
        } else if (hours < 12) {
            meridian = 'AM'
            if (hours === 0) {
                hours = 12
            }
        } else {
            meridian = `PM`
        }
        
        const parsedTime = hours + ":" + minutes + ' ' + meridian
        const eventLocation = document.querySelector("#event--location")
        const eventZip = document.querySelector("#event--zip")
        const eventDescription = document.querySelector("#event--description")
        const eventDate = document.querySelector("#event--date")
        const newEventDate = eventDate.value.split("-")
        const parsedDate = `${newEventDate[1]}-${newEventDate[2]}-${newEventDate[0]}`
        const eventId = document.querySelector("#eventId")
        if(eventTime.value && eventLocation.value && eventDate.value && eventName.value && eventDate.value){

            if (eventId.value === "") {
                const newEvent = {
                    name: eventName.value,
                    date: parsedDate,
                    time: parsedTime,
                    location: eventLocation.value,
                    zip: eventZip.value,
                    description: eventDescription.value,
                    userId: currentUserId
                }
                saveEvent(newEvent)
                render()
                localStorage.setItem("event", "eventsChanged")

            } else {
                const updatedEvent = {
                    name: eventName.value,
                    date: parsedDate,
                    time: parsedTime,
                    location: eventLocation.value,
                    zip: eventZip.value,
                    description: eventDescription.value,
                    id: parseInt(eventId.value),
                    userId: currentUserId
                }
                editEvent(updatedEvent)
                eventId.value = ""
                localStorage.setItem("event", "eventsChanged")

            }

        }else{
            window.alert("Please fill in all fields")
        }

    }
})
