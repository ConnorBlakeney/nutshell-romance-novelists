import {RegisterForm} from "./RegisterForm.js"
const contentTarget = document.querySelector(".auth--login")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("userAuthenticated", e => {
    contentTarget.innerHTML = ""
})

eventHub.addEventListener("click", e => {
    if (e.target.id === "login--button") {
        const username = document.querySelector("#login--username").value
        const password = document.querySelector("#login--password").value


        return fetch(`http://localhost:8088/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length > 0) {
                    const user = users[0]

                    if (user.password === password) {
                        sessionStorage.setItem("activeUser", user.id)
                        sessionStorage.setItem("activeUserUsername", user.username)
                        
                        eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
                    }
                }
                contentTarget.innerHTML = ""
            })
    }
})


const render = () => {
    contentTarget.innerHTML += `
        <section class="login">
            <h3>Login Here</h3>
            <input id="login--username" type="text" placeholder="Enter your username">
            <input id="login--password" type="password" placeholder="Enter your password">
            <br>
            <button id="login--button">Log In</button>
            <br>
            <button id="newAccountButton">I don't have an account</button>
        </section>
    `
}

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "newAccountButton"){
        RegisterForm()
    }
})

export const LoginForm = () => {
    render()
}