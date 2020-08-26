import { useEvents, saveEvent, editEvent } from "./EventsDataProvider.js"

const contentTarget = document.querySelector(".eventFormContainer")
const eventHub = document.querySelector("container")

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
        <input typer="hidden" name="eventId" id="eventId" value="">
    </section>
    `
}

//eventListener that listens for the "Save Button" and updates the database with the new event information
//this eventListener also updates an event in the database if it is being edited
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveEventButton") {
        const eventName = document.querySelector("#event--name")
        const eventDate = document.querySelector("#event--date")
        const eventTime = document.querySelector("#event--time")
        const eventLocation = document.querySelector("#event--location")
        const eventDescription = document.querySelector("#event--description")
        const eventId = document.querySelector("#eventId")

        if (eventName.value && eventDate.value && eventTime.value && eventLocation.value && eventDescription.value) {
            const eventId = document.querySelector("#eventId")
            if (eventId.value === "") {
                const newEvent = {
                    name: eventName.value,
                    date: eventDate.value,
                    time: eventTime.value,
                    location: eventLocation.value,
                    description: eventDescription.value
                }
                saveEvent(newEvent)
                render()
            } else {
                const updatedEvent = {
                    name: eventName.value,
                    date: eventDate.value,
                    time: eventTime.value,
                    location: eventLocation.value,
                    description: eventDescription.value,
                    id: parseInt(eventId.value)
                }
                editEvent(updatedEvent)
                eventId.value = ""
            }
        }
    }
})

//eventListener that is listening for the Edit Event Button to be clicked and then it is displaying the information from that event in the form for updating. 
eventHub.addEventListener("editEventButtonClicked", customeEvent => {
    const allEvents= useEvents()
    const eventId = event.detail.event.id
    const eventObj = allEvents.find(event => event.id === eventId)

    const eventName = document.querySelector("#event--name")
    const eventDate = document.querySelector("#event--date")
    const eventTime = document.querySelector("#event--time")
    const eventLocation = document.querySelector("#event--location")
    const eventDescription = document.querySelector("#event--description")
    const eventId = document.querySelector("#eventId")

    eventName = eventObj.name
    eventDate= eventObj.date
    eventTime = eventObj.time
    eventLocation = eventObj.location
    eventDescription = eventObj.description
    eventId = eventId
})
