// Created by Brett Derrington

const messagesComponent = {
    HTMLComponent: (messageObject) => {
        const userID = sessionStorage.getItem("activeUser")
        
        if (messageObject.userID == userID) {
            const messageHtmlString = `<section class="messageObject">
       
       <section id="messageObject--${messageObject.id}" class="messageObject">
       <span><span class="messages-title--${messageObject.userID}---${messageObject.username}-${messageObject.id} bold">${messageObject.username}:</span> ${messageObject.message}</span>
       <br><button id="message--EditButton--${messageObject.id}--${messageObject.userID}">Edit</button>
       <button id="message--DeleteButton--${messageObject.id}--${messageObject.userID}">Delete</button>
       </section>
      
       </section>
       <br>`

            return messageHtmlString
        }
        else if (messageObject.privateUserId === parseInt(userID)) {
            return `<section class="messageObject">
       
          <section id="messageObject--${messageObject.id}" class="messageObject privateMessage">
          <span><span class="messages-title--${messageObject.userID}---${messageObject.username}-${messageObject.id} bold">${messageObject.username}</span>: ${messageObject.message}</span></span>
          </section>
         
          </section>`
        }
        else if (messageObject.privateUserId === 0){
            return `<section class="messageObject">
       
          <section id="messageObject--${messageObject.id}" class="messageObject">
          <span><span class="messages-title--${messageObject.userID}---${messageObject.username}-${messageObject.id} bold">${messageObject.username}</span>: ${messageObject.message}</span></span>
          </section>
         
          </section>`
        }
        else{
            return ''
        }
    },
    //populates a text box to submit a message
    messageInputComponent: () => {
        const inputComponent = `<textarea class="message--Input" name="message__Input" type="text"></textarea><button class="message--SubmitButton">Submit</button>`
        return inputComponent
    },


    //factory function that will change the message sent inner html to hold the value for editing
    messageFactoryInputFunction: (messageObject) => {
        const messageInputBox = document.querySelector(`#messageObject--${messageObject.id}`)

        messageInputBox.innerHTML = `<input class="message--Input" name="message__Input" type="text">
           <button class="message--SubmitButton">Save</button>
           <input type="hidden" id="hiddenIdValue" value="${messageObject.id}" />`

        const inputValue = messageObject.message
        const inputLocation = document.querySelector(".message--Input")
        inputLocation.value = inputValue
    }
}

export default messagesComponent