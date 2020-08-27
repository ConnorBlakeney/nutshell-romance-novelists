import { NewsList } from "./home/HomeList.js"
import { NewsForm } from "./home/NewsEntryForm.js"
import { friendList } from "./friends/UsersList.js"
import messagesAPI from "./messages/messageData.js"
import messageList from "./messages/messageRenderHTML.js"
import "./home/NewsEditForm.js"
import "./home/WeatherList.js"
import { TaskForm } from "./tasks/TaskForm.js"
import { TaskList } from "./tasks/TaskList.js"


export const Nutshell = () => {
    NewsList()
    NewsForm()
    TaskForm()
    TaskList()
    friendList()
    messagesAPI.messagesGetData().then(() => {messageList()})
}

