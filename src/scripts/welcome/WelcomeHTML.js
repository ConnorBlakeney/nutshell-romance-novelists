import {useUsers} from "../users/usersDataProvider.js"

const contentTarget = document.querySelector(".welcome")

export const welcome = () => {
    const username = sessionStorage.getItem("activeUserUsername")
    

    contentTarget.innerHTML =  `
    <h2 class="welcomeName"> Welcome ${username}!</h2>`
}