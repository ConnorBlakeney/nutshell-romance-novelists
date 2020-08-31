//author: Connor Blakeney
// purpose: this module is used to establish the Task HTML form and to 
// maintain and alter its state with create, edit, and delete functionality

import { editTasks, saveTasks, deleteTasks, getTasks, useTasks } from "./TaskDataProvider.js";

const eventHub = document.querySelector(".container")
let contentTarget = document.querySelector(".tasksContainer")

let tasks = []

// eventHub.addEventListener("click", (clickEvent) => {
//   if (clickEvent.target.id === "saveNote") {
//     // Make a new object representation of a note

//     const taskContent = document.querySelector("#task--content")
//     const taskDeadline = document.querySelector("#task--deadline")

//     // const criminalId = parseInt(noteCriminal.value)

//     if (taskId !== 0) {
//       const newTask = {
//       content: taskContent.value,
//       deadline: taskDeadline.value,
//       timestamp: Date.now(),
//     //   userId: parseInt(noteCriminal.value)
//     }

//     // Change API state and application state
//     saveTasks(newTask)
//     } 
// }
// })

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
            }
        }
    }
})

// eventHub.addEventListener("click", clickEvent => {
//     let currentUserId = parseInt(sessionStorage.getItem("activeUser"))

//     if (clickEvent.target.id === "newTask2") {
//         const taskContent = document.querySelector("#task--content")
//         const taskDeadline = document.querySelector("#task--deadline")

//         if (taskContent.value && taskDeadline.value) {
//             const taskId = document.querySelector("#taskId")
//             if (taskId.value === "") {
//                 const newTask = {
//                     content: taskContent.value,
//                     deadline: taskDeadline.value,
//                     userId: currentUserId,
//                     timestamp: Date.now(),
//                 }
//                 saveTasks(newTask)
//                 render()
//             } else {
//                 const updatedTask = {
//                     content: taskContent.value,
//                     deadline: taskDeadline.value,
//                     userId: currentUserId,
//                     timestamp: Date.now(),
//                     id: parseInt(taskId.value)
//                 }
//                 editTasks(updatedTask)
//                 taskId.value = ""
//                 render()
//             }
//         }
//     } 
// })

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
//   let currentUserId = parseInt(sessionStorage.getItem("activeUser"))
//     const task = tasks.map(task => task.userId === currentUserId)
    
//     for (let i = 0; i < task.length; i++) {
//         if (task[i] === true) {
        contentTarget.innerHTML = `
        <section class="taskForm">
            <h3> Create a new task </h3>
            <label for="task--content">Task</label>
            <textarea id="task--content" placeholder="Task text here"></textarea>
            <label for="task--deadline">Deadline</label>
            <input type="date" id="task--deadline" />
            <button id="newTask1">Save Task</button>
            <input type="hidden" name="taskId" id="taskId" value="">
        </section>
    `
    } 
//  else {
        let contentFriendTarget = document.querySelector(".friendsTasksContainer")
        contentFriendTarget.innerHTML = `
        <section class="taskForm">
            <div id="userFriendTasks">Your Friend's Tasks</div>
            
            <input type="hidden" name="taskId" id="taskId" value="">
        </section>
    `
//     }

//     }
//     console.log(task)
// }

export const TaskForm = () => {
   render()
}

// export const TaskForm = () => {
    
// }

// const render = (tasks) => {
//   let currentUserId = parseInt(sessionStorage.getItem("activeUser"))
//     const taskMatch = tasks.filter(task => task.userId === currentUserId)
//     const taskMatchId = taskMatch.map(task => task.userId === currentUserId)

//     const taskNoMatch = tasks.filter(task => task.userId !== currentUserId)
//     const taskNoMatchId = taskNoMatch.map(task => task.userId !== currentUserId)
    
    
//         if (taskMatchId) {
//         contentTarget.innerHTML = `
//         <section class="taskForm">
//             <div id="userTasks">Your Tasks</div>
//             <label for="task--content">Content</label>
//             <textarea id="task--content" placeholder="Note text here"></textarea>
//             <label for="task--deadline">Deadline</label>
//             <input type="date" id="task--deadline" />
//             <button id="newTask">Save Task</button>
//             <input type="hidden" name="taskId" id="taskId" value="">
//         </section>
//     `
//     } else if (taskNoMatchId) {
//         contentTarget = document.querySelector(".friendsTasksContainer")
//         contentTarget.innerHTML = `
//         <section class="taskForm">
//             <div id="userFriendTasks">Your Friend's Tasks</div>
//             <label for="task--content">Content</label>
//             <textarea id="task--content" placeholder="Note text here"></textarea>
//             <label for="task--deadline">Deadline</label>
//             <input type="date" id="task--deadline" />
//             <button id="newTask">Save Task</button>
//             <input type="hidden" name="taskId" id="taskId" value="">
//         </section>
//     `
//     }

    
//     console.log(taskMatch, taskNoMatch, taskMatchId, taskNoMatchId)
// }