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
      // Key/value pairs here
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

const render = () => {
  contentTarget.innerHTML = `
        <section class="taskForm">
            <label for="task--content">Content</label>
            <textarea id="task--content" placeholder="Note text here"></textarea>
            <label for="task--deadline">Deadline</label>
            <input type="date" id="task--deadline" />
            <button id="newTask">Save Task</button>
        </section>
    `
}

export const TaskForm = () => {
   render()
};