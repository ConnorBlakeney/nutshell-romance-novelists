//author: Rebecca Parker
//purpose: renders logout button and handles click event to clear session storage and 
//reload page on click

const contentTarget = document.querySelector(".logout")
const eventHub = document.querySelector(".container")

export const logout = () => {
    contentTarget.innerHTML = `
        <button class="" id="logoutButton">Logout</button>`
}

eventHub.addEventListener("click", event => {
    if(event.target.id === "logoutButton"){
        sessionStorage.clear()
        //reloads browser as if refresh was clicked
        location.reload()
    }
})

