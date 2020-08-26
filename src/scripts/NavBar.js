
const contentTarget = document.querySelector(".navBarContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
})

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "showTasks") {
    const customEvent = new CustomEvent("showTasksClicked")
    eventHub.dispatchEvent(customEvent)
  }
})

export const navList = () => {
contentTarget.innerHTML =
`<header>
<nav class="nav__container">

    <ul class="list__container">
        <button>Home</button>
        <button>Events</button>
        <button id="showTasks">Tasks</button>
        <button>Friends</button>
        <button>Logout</button>
    </ul>
</nav>
</header>`
}