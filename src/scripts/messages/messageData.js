// API calls for messages
const messagesAPI = {
    messagesDataArray: [],
    messageUrl: "http://localhost:8088/messages",
    messagesGetData: () => {
        return fetch(`${messagesAPI.messageUrl}`).then(
            (httpResponse) => {
                return httpResponse.json()
            }).then((messageData) => {
                messagesAPI.messagesDataArray = []
                messagesAPI.messagesDataArray = messageData
                
            }
        )
    },
    messagePostData: (messageObject) => {
        return fetch(`${messagesAPI.messageUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObject)
        }
        ).then(response => response.json())
        // .then(messageStateChangeEvent)
    },
    updateEditMessage: (id, editObject) => {
        return fetch(`${messagesAPI.messageUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editObject)
        })
        // .then(messageStateChangeEvent)
    },
    getUserMessageEntry: (id) => {
        return fetch(`${messagesAPI.messageUrl}/${id}`)
            .then(response => response.json())
    },
    deletePostData: (id) => {
        return fetch(`${messagesAPI.messageUrl}/${id}`, {
            method: "DELETE"
        }).then(response => response.json())
        // .then(messageStateChangeEvent)
    }
}

// const eventHub = document.querySelector('.messages')
// const messageStateChangeEvent = () => {
//     const messageStateChangedEvent = new CustomEvent("messageStateChanged")

//     eventHub.dispatchEvent(messageStateChangedEvent)
// }

export default messagesAPI