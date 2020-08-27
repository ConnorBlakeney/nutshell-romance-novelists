import messagesAPI from "./messages/messageData.js"
import messageList from "./messages/messageRenderHTML.js"

export const Nutshell = () => {
    // Render all your UI components here
    messagesAPI.messagesGetData().then(() => {messageList()})
}