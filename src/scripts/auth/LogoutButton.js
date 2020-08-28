

const contentTarget = document.querySelector(".logout")
const eventHub = document.querySelector(".container")

export const logout = () => {
    contentTarget.innerHTML = `
        <button class="" id="logoutButton">Logout</button>`
}

eventHub.addEventListener("click", event => {
    if(event.target.id === "logoutButton"){
        sessionStorage.clear()
        location.reload()
    }
})

