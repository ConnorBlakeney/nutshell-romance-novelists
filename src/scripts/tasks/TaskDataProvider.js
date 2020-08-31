// author: Connor Blakeney
// purpose: module created to fetch and manipulate task data from api

let tasks = []

const eventHub = document.querySelector(".container")

//function to dispatch change event that app state changed
const dispatchStateChangeEvent = () => {
    const taskStateChangedEvent = new CustomEvent("taskStateChanged")
    eventHub.dispatchEvent(taskStateChangedEvent)
}

//function to get tasks from the API
export const getTasks = () => {
    return fetch("http://localhost:8088/tasks")
        //turn it into JSON
        .then(response => response.json())
        .then(parsedTasks => {
            tasks = parsedTasks            
        })
}

//function to delete an entry
export const deleteTasks = (taskId) => {
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "DELETE"
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
}

//function to save entry after entered into form
export const saveTasks = (taskObj) => {
    const jsonTask = JSON.stringify(taskObj) //turn object into string/strings
    return fetch("http://localhost:8088/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonTask
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
} 

//function to edit entry
export const editTasks = (task) => {
    return fetch(`http://localhost:8088/tasks/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
}

export const useTasks = () => {
    const sortedByDate = tasks.sort(
        (currentTask, nextTask) =>
            Date.parse(currentTask.date) - Date.parse(nextTask.date)
    )
    return sortedByDate
}

window.addEventListener("storage", () => {
    const event = localStorage.getItem("event")
    
    if (event === "tasksChanged"){
        localStorage.clear()
        getTasks()
        .then(() => {
            dispatchStateChangeEvent()
        })

    }
})

export const patchTask = (taskId) => {
    const completedTask = {
        complete: true
    }
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedTask)
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
}

export const restoreTask = (taskId) => {
    const restoredTask = {
        complete: false
    }
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(restoredTask)
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
}
