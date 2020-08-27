// author: Connor Blakeney
// purpose: module converts tasks into HTML format and creates click
// events for delete and edit
import { deleteTasks, editTasks } from "./TaskDataProvider.js";

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteBtn--")) {
        const [ prompt, taskIdString ] = clickEvent.target.id.split("--")  // "3"

        deleteTasks(taskIdString)
    }
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("editBtn--")){
        const [prompt, id] = clickEvent.target.id.split("--")

        const customEvent = new CustomEvent("editButtonClicked", {
            detail: {
                taskId: parseInt(id)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

eventHub.addEventListener("change", changeEvent => {
    if(changeEvent.target.id.startsWith("taskCheck--")){
        const [prompt, id] = changeEvent.target.id.split("--")
        const checkState = changeEvent.target.id.startsWith("taskCheck--")

        const customEvent = new CustomEvent("checkButtonClicked", {
            detail: {
                taskId: parseInt(id),
                checkState: checkState.checked
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

eventHub.addEventListener("checkButtonClicked", customEvent => {
    if (customEvent.detail.checkState) {
        const contentTarget = document.querySelector(".task--deadline")
        contentTarget.innerHTML = `<div>Completed!</div>`
    }
    if (customEvent.detail.checkState === false) {
        render()
    }
    debugger
})

export const TaskHTMLConverter = (task) => {
    return `
    <section class="individualTask">
        <input type="checkbox" id="taskCheck--${task.id}" name="task--${task.id}" value="Task ${task.id}">
        <label for="task--${task.id}">${task.content}</label><br>
        <div id= "deadline--${task.id}" class="task--deadline">Task Deadline: ${task.deadline}</div>
        <button id="deleteBtn--${task.id}">Delete</button>
        <button id="editBtn--${task.id}">Edit</button>
    </section>
`
}