
const contentTarget = document.querySelector(".navBarContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "friendsButton"){
        const newEvent = new CustomEvent("friendsButtonClicked")
        eventHub.dispatchEvent(newEvent)
    }
})

export const navList = () => {
contentTarget.innerHTML =
`<header>
<nav class="nav__container">
    <button><Home</button>
    <button>Events</button>
    <button>Tasks</button>
    <button id="friendsButton">Friends</button>
    <button>Logout</button>
</nav>
</header>`
}