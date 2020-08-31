// author: Connor Blakeney
// purpose: module converts tasks into HTML format and creates click
// events for delete and edit
import { deleteTasks, restoreTask } from "./TaskDataProvider.js";

let tasks = []

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

// eventHub.addEventListener("click", clickEvent => {
//     if (clickEvent.target.id.startsWith("taskCheck--")) {
//         const [promt, id] = clickEvent.target.id.split("--")
//         patchTask(parseInt(id))


//     }

// })

eventHub.addEventListener("click", clickEvent => {

    if(clickEvent.target.id.startsWith("taskCheck--")){
        const [prompt, id] = clickEvent.target.id.split("--")

        const customEvent = new CustomEvent("checkButtonClicked", {
            detail: {
                taskId: parseInt(id),
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

// eventHub.addEventListener("click", clickEvent => {
//     if (clickEvent.target.id.startsWith("complete--")) {
//         const [promt, id] = clickEvent.target.id.split("--")

        
//         patchTask(parseInt(id))
//     }

// })

export const TaskHTMLConverter = (task) => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))
    // console.log(currentUserId === task.userId)
    if (task.complete && currentUserId === task.userId) {
        return `
        <section class="individualTask">
            <input class="checkbox" checked type="checkbox" id="taskCheck--${task.id}" name="task--${task.id}" value="${task.complete}">
            <label for="task--${task.id}">${task.content}</label><br>
            <div id= "deadline--${task.id}" class="task--deadline">Completed!</div>
            <button id="deleteBtn--${task.id}">Delete</button>
            <button id="editBtn--${task.id}">Edit</button>
        </section>
        `
    } else if (!task.complete && currentUserId === task.userId) {
        return `
        <section class="individualTask">
            <input class="checkbox" type="checkbox" id="taskCheck--${task.id}" name="task--${task.id}" value="${task.complete}">
            <label for="task--${task.id}">${task.content}</label><br>
            <div id= "deadline--${task.id}" class="task--deadline">Task Deadline: ${task.deadline}</div>
            <button id="deleteBtn--${task.id}">Delete</button>
            <button id="editBtn--${task.id}">Edit</button>
        </section>
        `
    }
     else if (task.complete && !(currentUserId === task.userId)) {
        return `
        <section class="individualTask">
            <input class="checkbox" type="checkbox" checked id="taskCheck--${task.id}" name="task--${task.id}" value="${task.complete}">
            <label for="task--${task.id}">${task.content}</label><br>
            <div id= "deadline--${task.id}" class="task--deadline">Completed!</div>
        </section>
        `
    } 
    else {
        return `
        <section class="individualTask">
            <input class="checkbox" type="checkbox" id="taskCheck--${task.id}" name="task--${task.id}" value="${task.complete}">
            <label for="task--${task.id}">${task.content}</label><br>
            <div id= "deadline--${task.id}" class="task--deadline">Task Deadline: ${task.deadline}</div>
        </section>
        `
    } 
}

// find a way to grab boolean value from checkbox
// assign that value to complete in tasks database
// if boolean is true then show task as complete using boolean value from api
// if boolean is false then box is unchecked and show deadline for specific task
// maintain state even on page reload