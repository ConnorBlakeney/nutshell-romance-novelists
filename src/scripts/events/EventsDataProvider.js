const eventHub = document.querySelector(".container")

const dispatchEventStateChangeEvent = () => {
    const eventStateChangedEvent = new CustomEvent("eventStateChanged")

    eventHub.dispatchEvent(eventStateChangedEvent)
}

let events = []

export const useEvents = () => {
    return events.slice()
}

export const getEvents = () => {
    return fetch("http://localhost:8088/events")
        .then(response => response.json())
        .then(data => {
            events = data
        })
}

export const saveEvent = (event) => {
    const jsonEvent = JSON.stringify(event)

    return fetch("http://localhost:8088/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonEvent
    })
    .then(getEvents)
    .then(dispatchEventStateChangeEvent)
}

export const editEvent = (event) => {
    return fetch(`http://localhost:8088/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application.json",
        },
        body:JSON.stringify(event)
    })
    .then(getEvents)
    .then(dispatchEventStateChangeEvent)
}

export const deleteEvent = (event) => {
    return fetch(`http://localhost:8088/events/${event.id}`, {
        method: "DELETE"
    })
    .then(getEvents)
    .then(dispatchEventStateChangeEvent)
}