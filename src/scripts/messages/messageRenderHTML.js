import messagesAPI from "./messageData.js"
import messagesComponent from "./messageComponent.js"

const messageList = () => {
    //find location and clear the section
    const chatTitleLocation = document.querySelector(".messages")
    const messageLocation = document.querySelector(".messageObject--section")
    messageLocation.innerHTML = "";
    chatTitleLocation.innerHTML = "Chat";

    for (let messageObject of messagesAPI.messagesDataArray) {
        //iterate the data
        const convertedMessageObject = messagesComponent.HTMLComponent(messageObject)

        messageLocation.innerHTML += convertedMessageObject
    }

    messageLocation.innerHTML += `<button class="newMessageButton">New</button>`

    // friendsEventListener()
}

export default messageList