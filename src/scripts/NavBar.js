import {eventsList} from "./events/EventsList.js"
import {newEventForm} from "./events/NewEventForm.js"

const contentTarget = document.querySelector(".navBarContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "eventsNavButton"){ 
        eventsList()
        newEventForm()
    }
})

export const navList = () => {
contentTarget.innerHTML =
`<header>
<nav class="nav__container">
    <ul class="list__container">
        <button>Home</button>
        <button id = "eventsNavButton">Events</button>
        <button>Tasks</button>
        <button>Friends</button>
        <button>Logout</button>
    </ul>
</nav>
</header>`
}