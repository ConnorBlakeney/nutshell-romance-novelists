const contentTarget = document.querySelector(".auth--register")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("userAuthenticated", e => {
    contentTarget.innerHTML = ""
})


eventHub.addEventListener("click", e => {
    if (e.target.id === "register--button") {
        const username = document.querySelector("#register--username").value
        const email = document.querySelector("#register--email").value
        const password = document.querySelector("#register--password").value
        const passwordVerify = document.querySelector("#register--password-verify").value

        let validUsername = true
        for(let i=0; i < username.length; i++){
            if(username[i] === " "){
                validUsername = false
            }
        }

        if (username !== ""
            && validUsername 
            && email !== ""
            && password !== ""
            && passwordVerify !== ""
            && (password === passwordVerify)) {

            // Does the user exist?
            fetch(`http://localhost:8088/users?username=${username}`)
            .then(response => response.json())
            .then(users => {
                if (users.length === 0) {
                    fetch("http://localhost:8088/users", {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "username": username,
                            "email": email,
                            "password": password
                        })
                    })
                        .then(response => response.json())
                        .then((newUser) => {
                            sessionStorage.setItem("activeUser", newUser.id)
                            sessionStorage.setItem("activeUserUsername", newUser.username)
    
                            eventHub.dispatchEvent(new CustomEvent("userAuthenticated"))
                            localStorage.setItem("event", "usersChanged")
                        })

                        contentTarget.innerHTML = ""
                }
                else {
                    window.alert("Username already exists!  😭")
                }
            })
        }else{
            window.alert("Username cannot contain spaces and all fields must be filled in")
        } 
    }
})


const render = () => {
    contentTarget.innerHTML += `
        <section class="register">
        <h3> Don't have an account? Register Here </h3>
            <input id="register--username" type="text" placeholder="Enter your username">
            <input id="register--email" type="text" placeholder="Enter your email address">
            <input id="register--password" type="password" placeholder="Enter your password">
            <input id="register--password-verify" type="password" placeholder="Verify your password">
            <br>
            <button id="register--button">Register</button>
        </section>
    `
}

export const RegisterForm = () => {
    render()
}