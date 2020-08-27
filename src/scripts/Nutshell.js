import { NewsList } from "./home/HomeList.js"
import { NewsForm } from "./home/NewsEntryForm.js"
import "./home/NewsEditForm.js"
import "./home/WeatherList.js"
import { TaskForm } from "./tasks/TaskForm.js"
import { TaskList } from "./tasks/TaskList.js"
import { friendList } from "./friends/UsersList.js"

export const Nutshell = () => {
    NewsList()
    NewsForm()
    TaskForm()
    TaskList()
    friendList()
}