import messagesAPI from "./messageData.js"
import messagesComponent from "./messageComponent.js"

const messageList = () => {
    //find location and clear the section
    const messageLocation = document.querySelector(".messageObject--section")
    messageLocation.innerHTML = "";

    for (let messageObject of messagesAPI.messagesDataArray) {
        //iterate the data
        const convertedMessageObject = messagesComponent.HTMLComponent(messageObject)

        messageLocation.innerHTML += convertedMessageObject
    }

    // friendsEventListener()
}

export default messageList