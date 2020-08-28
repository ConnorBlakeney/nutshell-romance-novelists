import { useEvents, saveEvent, editEvent } from "./EventsDataProvider.js"

const contentTarget = document.querySelector(".eventFormContainer")
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
    const eventDescription = document.querySelector("#event--description")
    const id = document.querySelector("#eventId")

    eventName.value = eventObj.name
    eventDate.value = eventObj.date
    eventTime.value = eventObj.time
    eventLocation.value = eventObj.location
    eventDescription.value = eventObj.description
    id.value = eventId
})

//This function renders the HTML representation of the form to the DOM
export const newEventForm = () => {
    render()
}


const render = () => {
    contentTarget.innerHTML = `
    <section class="newEventForm">
        <input type="text" id="event--name" placeholder="Enter event name"/>
        <input type="date" name="eventDate" id="event--date"/>
        <input type="time" name="eventTime" id="event--time"/>
        <input type="text" id="event--location" placeholder="Enter event location"/>
        <textarea id="event--description" placeholder="Event Description"></textarea>

        <button id="saveEventButton"> Save Event </button>
        <input type="hidden" name="eventId" id="eventId" value="">
    </section>
    `
}

//eventListener that listens for the "Save Button" and updates the database with the new event information
//this eventListener also updates an event in the database if it is being edited
eventHub.addEventListener("click", clickEvent => {
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
        const eventDescription = document.querySelector("#event--description")
        const eventDate = document.querySelector("#event--date")
        const newEventDate = eventDate.value.split("-")
        const parsedDate = `${newEventDate[1]}-${newEventDate[2]}-${newEventDate[0]}`
        const eventId = document.querySelector("#eventId")

        if (eventId.value === "") {
            const newEvent = {
                name: eventName.value,
                date: parsedDate,
                time: parsedTime,
                location: eventLocation.value,
                description: eventDescription.value
            }
            saveEvent(newEvent)
            render()
        } else {
            const updatedEvent = {
                name: eventName.value,
                date: parsedDate,
                time: parsedTime,
                location: eventLocation.value,
                description: eventDescription.value,
                id: parseInt(eventId.value)
            }
            editEvent(updatedEvent)
            eventId.value = ""
        }

    }
})
