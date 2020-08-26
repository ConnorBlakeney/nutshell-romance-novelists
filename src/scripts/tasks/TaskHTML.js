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

export const TaskHTMLConverter = (task) => {
    return `
    <section class="individualTask">
        <input type="checkbox" id="task--${task.id}" name="task--${task.id}" value="Task ${task.id}">
        <label for="task--${task.id}">${task.content}</label><br>
        <div id= "deadline--${task.id}" class="task--deadline">Task Deadline: ${new Date(
              task.deadline
            ).toLocaleDateString("en-US")}</div>
        <button id="deleteBtn--${task.id}">Delete</button>
        <button id="editBtn--${task.id}">Edit</button>
    </section>
`
}