//author: Connor Blakeney
// purpose: this module is used to establish the Task HTML form and to 
// maintain and alter its state with create, edit, and delete functionality

import { editTasks, saveTasks, getTasks, useTasks } from "./TaskDataProvider.js";

const eventHub = document.querySelector(".container")
let contentTarget = document.querySelector(".tasksContainer")
let contentFriendTarget = document.querySelector(".friendsTasksContainer")


let tasks = []

eventHub.addEventListener("click", clickEvent => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    if (clickEvent.target.id === "newTask1") {
        const taskContent = document.querySelector("#task--content")
        const taskDeadline = document.querySelector("#task--deadline")

        if (taskContent.value && taskDeadline.value) {
            const taskId = document.querySelector("#taskId")
            if (taskId.value === "") {
                const newTask = {
                    content: taskContent.value,
                    deadline: taskDeadline.value,
                    userId: currentUserId,
                    timestamp: Date.now(),
                }
                saveTasks(newTask)
                localStorage.setItem("event", "tasksChanged")
                render()
            } else {
                const updatedTask = {
                    content: taskContent.value,
                    deadline: taskDeadline.value,
                    userId: currentUserId,
                    timestamp: Date.now(),
                    id: parseInt(taskId.value)
                }
                editTasks(updatedTask)
                taskId.value = ""
                render()
            }
        }
    } else if (clickEvent.target.id === "newTask2") {
        const taskContent = document.querySelector("#task--content2")
        const taskDeadline = document.querySelector("#task--deadline2")

        if (taskContent.value && taskDeadline.value) {
            const taskId = document.querySelector("#taskId")
            if (taskId.value === "") {
                const newTask = {
                    content: taskContent.value,
                    deadline: taskDeadline.value,
                    userId: tasks.userId,
                    timestamp: Date.now(),
                }
                saveTasks(newTask)
                render()
                localStorage.setItem("event", "tasksChanged")

            } else {
                const updatedTask = {
                    content: taskContent.value,
                    deadline: taskDeadline.value,
                    userId: tasks.userId,
                    timestamp: Date.now(),
                    id: parseInt(taskId.value)
                }
                editTasks(updatedTask)
                taskId.value = ""
                render()
                localStorage.setItem("event", "tasksChanged")

            }
        }
    }
})

eventHub.addEventListener("editButtonClicked", customEvent => {
    const allTasks = useTasks()
    const taskId = event.detail.taskId
    const taskObj = allTasks.find(task => task.id === taskId)

    const taskContent = document.querySelector("#task--content")
    const taskDeadline = document.querySelector("#task--deadline")
    const id = document.querySelector("#taskId")

    taskContent.value = taskObj.content
    taskDeadline.value = taskObj.deadline
    id.value = parseInt(taskId)
})

const render = () => {

        contentTarget.innerHTML = `
        <section class="taskForm">
            <h3> Create a new task </h3>
            <label for="task--content">Task</label>
            <textarea id="task--content" placeholder="Task text here"></textarea>
            <label for="task--deadline">Deadline</label>
            <input type="date" id="task--deadline" />
            <button id="newTask1">Save Task</button>
            <div id="yourTasks">Your Tasks</div>
            <input type="hidden" name="taskId" id="taskId" value="">
        </section>
    `
    

        contentFriendTarget.innerHTML = `
        <section class="taskForm">
            <div id="userFriendTasks">Your Friend's Tasks</div>
            
            <input type="hidden" name="taskId" id="taskId" value="">
        </section>
    `
}

    


export const TaskForm = () => {
   render()
}

