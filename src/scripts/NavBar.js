
const contentTarget = document.querySelector(".navBarContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id == "friendsButton"){
        const newEvent = new CustomEvent("friendsButtonClicked")
        eventHub.dispatchEvent(newEvent)
    }
})

export const navList = () => {
contentTarget.innerHTML =
`<header>
<nav class="nav__container">

    <ul class="list__container">
        <button><li>Home</li></button>
        <button><li>Events</li></button>
        <button><li>Tasks</li></button>
        <li><button id="friendsButton">Friends</button></li>
        <button><li>Logout</li></button>
    </ul>
</nav>
</header>`
}