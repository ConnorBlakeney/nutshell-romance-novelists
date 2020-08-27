import { NewsList } from "./news/NewsList.js"
import { NewsForm } from "./news/NewsEntryForm.js"
import "./home/NewsEditForm.js"
import "./weather/WeatherList.js"
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