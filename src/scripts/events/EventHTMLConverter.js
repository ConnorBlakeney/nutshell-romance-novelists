import {deleteEvent} from "./EventsDataProvider.js"

const eventHub = document.querySelector(".container")

//eventListener listening for the Delete Button to be click and then invoking the deleteEvent function to update database
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("deleteEventButton--")){
        const [prompt, eventId] = clickEvent.target.id.split("--")

        deleteEvent(eventId)
    }
})

//dispatching the click for the Event Edit button. Attaches the event Id to the event so the form can listen for that and know which event needs to be edited. 
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("editEventButton--")){
        const [prompt, eventId] = clickEvent.target.id.split("--")

        const customEvent = new CustomEvent("editEventButtonClicked", {
            detail: {
                eventId: parseInt(eventId)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})


export const eventHTML = (eventObj) => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    if (eventObj.id === currentUserId){

        return `
        <section class="event">
            <div class="event--name"> ${eventObj.name} </div>
            <div id="event--date"> ${eventObj.date} </div>
            <div class="event--time"> ${eventObj.time} </div>
            <div class="event--location">Location: ${eventObj.location}</div>
            <div class="eventDescription">Description: ${eventObj.description}</div>
    
            <button class="button" id="weatherButton--${eventObj.id}"> Show Weather </button>
            <button class="button" id="editEventButton--${eventObj.id}"> Edit </button>
            <button class="button" id="deleteEventButton--${eventObj.id}"> Delete </button>
           
        </section>`

    }else{
        return `
        <section class="event friendEvent">
            <div class="event--name"><i> ${eventObj.name}</i> </div>
            <div id="event--date"><i> ${eventObj.date} </i></div>
            <div class="event--time"> <i>${eventObj.time}</i> </div>
            <div class="event--location"><i>Location: ${eventObj.location}</i></div>
            <div class="eventDescription"><i>Description: ${eventObj.description}</i></div>
    
            <button class="button" id="weatherButton--${eventObj.id}"> Show Weather </button>
           
        </section>`
    }
    
}

