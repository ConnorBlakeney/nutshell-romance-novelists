import messagesComponent from "./messageComponent.js"
import messagesAPI from "./messageData.js"
import messageList from "./messageRenderHTML.js"
import { useUsers } from "../users/usersDataProvider.js"



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
            let i = inputLocation.value.search("@")
            let found = false
            let privateUserId = 0
            let privateUser = ""
          
            if(i >= 0){
                for(i++; found != true; i++){
                    if(inputLocation.value[i] != " " && inputLocation.value[i] != undefined){
                        privateUser = privateUser.concat(inputLocation.value[i])
                    }else{
                        found = true
                    }
                }
            }

            const users = useUsers()
            users.forEach(u => {
                if (privateUser === u.username){
                    privateUserId = u.id
                }
            })

            const messageInputValue = { "message": inputLocation.value, "userID": userId, "username": username, "privateUserId": privateUserId }
            //=========================================================================================================================
            //will need to make sure when testing that each message has a user id to match it to    
            messagesAPI.messagePostData(messageInputValue)
                .then(() => {
                    localStorage.setItem("event", "messageChanged")

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
                    localStorage.setItem("event", "messageChanged")

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
                    localStorage.setItem("event", "messageChanged")

                })
            }
        }

        //editing click event
        else if (clickEvent.target.className == "message--SubmitButton") {
            const editCheck = document.querySelector(".message--Input")
            let i = editCheck.value.search("@")
            let found = false
            let privateUserId = 0
            let privateUser = ""
          
            if(i >= 0){
                for(i++; found != true; i++){
                    if(editCheck.value[i] != " " && editCheck.value[i] != undefined){
                        privateUser = privateUser.concat(editCheck.value[i])
                    }else{
                        found = true
                    }
                }
            }

            const users = useUsers()
            users.forEach(u => {
                if (privateUser === u.username){
                    privateUserId = u.id
                }
            })
            if (editCheck.value != "") {
                const messageObjectID = document.querySelector("#hiddenIdValue").value
                messagesAPI.updateEditMessage(messageObjectID, { "message": editCheck.value, "userID": userId, "username": username, "privateUserId": privateUserId })
                    .then(() => {
                        localStorage.setItem("event", "messageChanged")
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
    contentTarget.innerHTML = `
    <section class="chatBorder">
    <h3> Chat </h3>
    <section class="messageObject--section"></section>
    <button class="newMessageButton">New</button>
    <section class="messageInput--section"></section>
    </section>`
    
  }

export default messageEventListener

export const ChatForm = () => {
    render()
 }

 window.addEventListener("storage", () => {
    const event = localStorage.getItem("event")
    
    if (event === "messageChanged"){
        localStorage.clear()
        messagesAPI.messagesGetData().then(() => {
            messageList()

        })
    }
})
