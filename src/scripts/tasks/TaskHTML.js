// author: Connor Blakeney
// purpose: module converts tasks into HTML format and creates click
// events for delete and edit
import { deleteTasks, editTasks, getTasks, useTasks } from "./TaskDataProvider.js";

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

eventHub.addEventListener("click", clickEvent => {
    // const taskDeadline = document.querySelector("#task--content")

    if(clickEvent.target.id.startsWith("taskCheck--")){
        const [prompt, id] = clickEvent.target.id.split("--")
        // const taskComplete = clickEvent.target.id

        const customEvent = new CustomEvent("checkButtonClicked", {
            detail: {
                taskId: parseInt(id),
            }
        })
        eventHub.dispatchEvent(customEvent)
        // console.log(taskComplete)
    }
})

// const myFunction = (task) => {
//   // Get the checkbox
//   var checkBox = document.getElementById(`taskCheck--${task.id}`).checked;
//   // Get the output text
//   var text = document.querySelector(".task--deadline").value;

//   // If the checkbox is checked, display the output text
//   if (checkBox == true){
//     text.style.display = "Completed!";
//   } else {
//     text.style.display = "none";
//   }
//     console.log(checkBox)
// }

export const TaskHTMLConverter = (task) => {
    if (task.complete) {
        return `
        <section class="individualTask">
            <input class="checkbox" checked type="checkbox" id="taskCheck--${task.id}" name="task--${task.id}" value="${task.complete}">
            <label for="task--${task.id}">${task.content}</label><br>
            <div id= "deadline--${task.id}" class="task--deadline">Completed!</div>
            <button id="deleteBtn--${task.id}">Delete</button>
            <button id="editBtn--${task.id}">Edit</button>
        </section>
        `
    } else {
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
}

// export const TaskHTMLConverterComplete = (task) => {
//     return `
//     <section class="individualTask">
//         <div class="complete">Complete</div>
//         <input type="checkbox" id="taskCheck--${task.id}" name="task--${task.id}" value="Task ${task.id}">
//         <label for="task--${task.id}">${task.content}</label><br>
//         <div id= "deadline--${task.id}" class="task--deadline">Task Deadline: ${task.deadline}</div>
//         <button id="deleteBtn--${task.id}">Delete</button>
//         <button id="editBtn--${task.id}">Edit</button>
//     </section>
// `
// }

// find a way to grab boolean value from checkbox
// assign that value to complete in tasks database
// if boolean is true then show task as complete using boolean value from api
// if boolean is false then box is unchecked and show deadline for specific task
// maintain state even on page reload