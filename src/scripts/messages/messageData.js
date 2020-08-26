// functions to create the HTML for a POSTed message and render it to the DOM
const messageAPI = {
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
    },
    updateEditMessage: (userId, editObject) => {
        return fetch(`${messagesAPI.messageUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editObject)
        })
    },
    getUserMessageEntry: (userId) => {
        return fetch(`${messagesAPI.messageUrl}/${id}`)
            .then(response => response.json());
    },
    deletePostData: (userId) => {
        return fetch(`${messagesAPI.messageUrl}/${id}`, {
            method: "DELETE"
        }).then(response => response.json());
    }
}

export default messagesAPI