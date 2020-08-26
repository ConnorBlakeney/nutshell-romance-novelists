
const contentTarget = document.querySelector(".navBarContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
})

export const navList = () => {
contentTarget.innerHTML =
`<header>
<nav class="nav__container">

    <ul class="list__container">
        <button><li>Home</li></button>
        <button><li>Events</li></button>
        <button><li>Tasks</li></button>
        <button><li>Friends</li></button>
        <button><li>Logout</li></button>
    </ul>
</nav>
</header>`
}