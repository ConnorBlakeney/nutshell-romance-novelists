//author: Connor Blakeney
// purpose: this module is used to establish the Task HTML form and to 
// maintain and alter its state with create, edit, and delete functionality

import { editTasks, saveTasks, deleteTasks, getTasks, useTasks } from "./TaskDataProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".tasksContainer")

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "saveNote") {
    // Make a new object representation of a note

    const taskContent = document.querySelector("#task--content")
    const taskDeadline = document.querySelector("#task--deadline")

    // const criminalId = parseInt(noteCriminal.value)

    if (criminalId !== 0) {
        const newTask = {
      content: taskContent.value,
      deadline: taskDeadline.value,
      timestamp: Date.now(),
    //   userId: parseInt(noteCriminal.value)
    }

    // Change API state and application state
    saveTasks(newTask)
    } 
}
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newTask") {
        const taskContent = document.querySelector("#task--content")
        const taskDeadline = document.querySelector("#task--deadline")
        const taskId = document.querySelector("#taskId")

        if (taskContent.value && taskDeadline.value) {
            const taskId = document.querySelector("#taskId")
            if (taskId.value === "") {
                const newTask = {
                    content: taskContent.value,
                    deadline: taskDeadline.value,
                    timestamp: Date.now(),
                }
                saveTasks(newTask)
                render()
            } else {
                const updatedTask = {
                    content: taskContent.value,
                    deadline: taskDeadline.value,
                    timestamp: Date.now(),
                    id: parseInt(taskId.value)
                }
                editTasks(updatedTask)
                taskId.value = ""
                render()
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
            <label for="task--content">Content</label>
            <textarea id="task--content" placeholder="Note text here"></textarea>
            <label for="task--deadline">Deadline</label>
            <input type="date" id="task--deadline" />
            <button id="newTask">Save Task</button>
            <input type="hidden" name="taskId" id="taskId" value="">
        </section>
    `
}

export const TaskForm = () => {
   render()
};