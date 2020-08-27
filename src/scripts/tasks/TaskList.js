// author: Connor Blakeney
// purpose: render tasks to the DOM and notify of task state changes

import { getTasks, useTasks } from "./TaskDataProvider.js"
import { TaskHTMLConverter } from "./TaskHTML.js"
import { getUsers, useUsers } from "../users/usersDataProvider.js";
import { TaskForm } from "./TaskForm.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".tasksCheckList")

const render = (tasksArray) => {
        //loop through entries array returning each entry as passed through converter function
        contentTarget.innerHTML = tasksArray.map(
            (currentTaskObj) => {
                return TaskHTMLConverter(currentTaskObj) 
                }
        ).join("") //remove commas
        // inserted function to find specific user, not sure what to do with it yet
        // const userTask = currentTaskObj.find(
        //             (user) => {
        //                 return user.id === currentTaskObject.userId  
        //             }
        //         )
        
        // DOM reference to where all tasks will be rendered
        // `${userTask.username}'s Tasks:` + 
    }



export const TaskList = () => {
    getTasks()
        .then(() => {
            const tasks = useTasks()
            render(tasks)
        })
}

eventHub.addEventListener("taskStateChanged", () => {
    const newTasks = useTasks()
    render(newTasks)
})