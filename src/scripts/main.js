import { LoginForm } from "./auth/LoginForm.js"
import { Nutshell } from "./Nutshell.js"


const contentTarget = document.querySelector(".auth")
const eventHub = document.querySelector(".container")

/*
    1. Check if the user is authenticated by looking in session storage for `activeUser`
    2. If so, render the Nutshell component
    3. If not, render the login and registration forms
    4. Also, if the user authenticates, and the login form is initially shown
        ensure that the Nutshell component gets rendered
*/

if ("activeUser" in sessionStorage){
    contentTarget.innerHTML = ""
    Nutshell()
    messageEventListener()
}else{
    LoginForm()
}

eventHub.addEventListener("userAuthenticated", () => {
    Nutshell()   
    messageEventListener()
})