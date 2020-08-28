const contentTarget = document.querySelector(".welcome")

export const pageWelcome = (userObj) => {
        contentTarget.innerHTML = `
        <h2>Hello ${userObj.name}!</h2>
        `
}