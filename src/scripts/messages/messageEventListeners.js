import messagesComponent from "./messageComponent.js"
import messagesAPI from "./messageData.js"
import messageList from "./messageRenderHTML.js"



const messageEventListener = () => {

    const userId = sessionStorage.getItem("activeUser")
    const username = sessionStorage.getItem("activeUserUsername")


    const messageEventLocation = document.querySelector(".messages")
    const messageInputLocation = document.querySelector(".messageInput--section")
    // const messageChatEventLocation = document.querySelector(".messageObject--section")

    messageEventLocation.addEventListener("click", clickEvent => {
        // message--SubmitButton
        if (clickEvent.target.className == "newMessageButton" && !document.querySelector("#hiddenIdValue")) {
            messageInputLocation.innerHTML = messagesComponent.messageInputComponent()
        }

        //saves messages
        //must have the hidden value not be on the page in order to not have conflicts
        else if (clickEvent.target.className == "message--SubmitButton" && !document.querySelector("#hiddenIdValue")) {
            const inputLocation = document.querySelector(".message--Input")
            const messageInputValue = { "message": inputLocation.value, "userID": userId, "username": username }
            //=========================================================================================================================
            //will need to make sure when testing that each message has a user id to match it to    
            messagesAPI.messagePostData(messageInputValue)
                .then(() => {
                    messagesAPI.messagesGetData().then(() => {
                        messageList()
                        messageInputLocation.innerHTML = ""
                    })
                })

        }

        //delete message event
        else if (clickEvent.target.id.startsWith("message--DeleteButton--")) {
            const cardDeleteIdAndUserId = event.target.id.split("--DeleteButton--")[1];
            const cardDelete = cardDeleteIdAndUserId.split("--")[0]
            const cardUserID = cardDeleteIdAndUserId.split("--")[1]
            if (userId == cardUserID) {
                messagesAPI.deletePostData(cardDelete).then(() => {
                    messagesAPI.messagesGetData().then(() => {
                        messageList()

                    })
                })
            }
        }
        //populating the input boxes at the message
        else if (clickEvent.target.id.startsWith("message--EditButton--") && !document.querySelector("#hiddenIdValue")) {
            const cardEditIDandUser = event.target.id.split("--EditButton--")[1];
            const cardEdit = cardEditIDandUser.split("--")[0];
            const cardUserId = cardEditIDandUser.split("--")[1];
            if (cardUserId == userId) {
                messagesAPI.getUserMessageEntry(cardEdit).then((messageObject) => {
                    messagesComponent.messageFactoryInputFunction(messageObject)
                })
            }
        }

        //editing click event
        else if (clickEvent.target.className == "message--SubmitButton") {
            const editCheck = document.querySelector(".message--Input")
            if (editCheck.value != "") {
                const messageObjectID = document.querySelector("#hiddenIdValue").value
                messagesAPI.updateEditMessage(messageObjectID, { "message": editCheck.value, "userID": userId, "username": username })
                    .then(() => {
                        messagesAPI.messagesGetData().then(() => {
                            messageList()

                        })
                    })
            }


        }


    })

    // messageChatEventLocation.addEventListener("messageStateChanged", () => {
    //     messagesAPI.messagesGetData().then(() => {messageList()})
    // })

}

const contentTarget = document.querySelector(".messages")
const render = () => {
    contentTarget.innerHTML = `Chat<section class="messageObject--section"></section>
    <button class="newMessageButton">New</button>
    <section class="messageInput--section"></section>`
  }

export default messageEventListener

export const ChatForm = () => {
    render()
 }