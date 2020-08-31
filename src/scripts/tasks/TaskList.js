// author: Connor Blakeney
// purpose: render tasks to the DOM and notify of task state changes

import { getTasks, useTasks, patchTask, restoreTask } from "./TaskDataProvider.js"
import { TaskHTMLConverter } from "./TaskHTML.js"
import { getUserFriends, getUsers, useUsers, useUserFriends } from "../users/usersDataProvider.js";

const eventHub = document.querySelector(".container")
let contentTarget = document.querySelector(".tasksCheckList")

let tasks = []
let userFriends = []
let friendsTasks = []

eventHub.addEventListener("taskStateChanged", customEvent => {
    tasks = useTasks()
    findFriends()
    render()
})
eventHub.addEventListener("userFriendsStateChanged", () => {
    userFriends = useUserFriends()
    findFriends()
    render()
    
})

const render = () => {
        //loop through entries array returning each entry as passed through converter function
        let currentUserId = parseInt(sessionStorage.getItem("activeUser"))

        const taskFilteredMatch = tasks.filter(task => task.userId === currentUserId)
        const taskFilteredNoMatch = tasks.filter(task => task.userId !== currentUserId)
        
        const allTasksTurnedIntoHTML = taskFilteredMatch.map(task => {
        return TaskHTMLConverter(task)
        }).join("")

        const allFriendTasksTurnedIntoHTML = taskFilteredNoMatch.map(task => {
        return TaskHTMLConverter(task)
        }).join("")

        contentTarget.innerHTML = `<h3> Tasks </h3> ${allTasksTurnedIntoHTML}`

        let contentFriendTarget = document.querySelector(".friendsTasksCheckList")
        contentFriendTarget.innerHTML = allFriendTasksTurnedIntoHTML
}        

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

eventHub.addEventListener("checkButtonClicked", customEvent => {

    const allTasks = useTasks()
    const taskId = customEvent.detail.taskId
    const taskObj = allTasks.find(task => task.id === taskId)

    const contentTarget = document.querySelector(`#deadline--${taskId}`)
    let checkedValue = document.querySelector(`#taskCheck--${taskId}`).checked

    if (checkedValue) {
        contentTarget.innerHTML = `<div class"complete" id="complete--"${taskId}>Completed!</div>`
        patchTask(taskId)

    } 
    else if (checkedValue === false) {
      contentTarget.innerHTML = TaskList()
      restoreTask(taskId)

    }
})

export const TaskList = () => {
    getTasks()
    getUsers()
    getUserFriends()
        .then (() => {
            tasks = useTasks()
            userFriends = useUserFriends()
            findFriends()
            render()
        })
}

const findFriends = () => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    let currentRelationships = userFriends.filter(f => {
        if(currentUserId === f.userId || currentUserId === f.friendId ){
            return f
        }
    })

    let friendIds = currentRelationships.map(r => {
        if(r.userId === currentUserId){
            return r.friendId
        }else{
            return r.userId
        }
    })
    
    friendIds.push(currentUserId)
    

    friendsTasks = tasks.filter(task => friendIds.find(id => task.userId === id))

}

eventHub.addEventListener("taskStateChanged", () => {
    const newTasks = useTasks()
    render(newTasks)
})