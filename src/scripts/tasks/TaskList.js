import { getTasks, useTasks } from "./TaskDataProvider.js"
import { TaskHTMLConverter } from "./TaskHTML.js"

const contentTarget = document.querySelector(".tasksContainer")

const render = (tasksArray, userArray) => {
        //loop through entries array returning each entry as passed through converter function
        const allTasksHTML = tasksArray.map(
            (currentTaskObj) => {
                return TaskHTMLConverter(currentTaskObj) 
                }
        ).join("") //remove commas
        // inserted function to find specific user, not sure what to do with it yet
        const userTask = taskObj.find(
                    (user) => {
                        return user.id === taskObject.userId  
                    }
                )
        
        // DOM reference to where all tasks will be rendered
        contentTarget.innerHTML = `${userTask.username}'s Tasks:` + allTasksHTML
    }





export const TaskList = () => {
    getTasks()
        .then(getUsers)
        .then(useTasks)
        .then(render)
}