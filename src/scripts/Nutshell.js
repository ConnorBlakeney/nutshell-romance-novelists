import { NewsList } from "./home/HomeList.js"
import { NewsForm } from "./home/NewsEntryForm.js"
import { friendList } from "./friends/UsersList.js"
import "./home/NewsEditForm.js"
import "./home/WeatherList.js"

export const Nutshell = () => {
    NewsList()
    NewsForm()
    friendList()
}