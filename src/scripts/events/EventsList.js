import {useEvents, getEvents} from "./EventsDataProvider.js"
import {eventHTML} from "./EventHTMLConverter.js"

const contentTarget = document.querySelector(".eventsContainer")
const eventHub = document.querySelector("container")

export const eventsList = () => {
    getEvents()
        .then (() => {
            const eventsArray = useEvents()
            render(eventsArray)
        })
}

const render = (arrayOfEvents) => {
    const allEventsTurnedIntoHTML = arrayOfEvents.map(event => {
        return eventHTML(event)
    }).join("")

    contentTarget.innerHTML = `
    <h2> Events </h2>
        <article class="eventsList">
            ${allEventsTurnedIntoHTML}
        </article>
    `
}