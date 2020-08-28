// author: Connor Blakeney
// purpose: render tasks to the DOM and notify of task state changes

import { getTasks, useTasks } from "./TaskDataProvider.js"
import { TaskHTMLConverter } from "./TaskHTML.js"
import { TaskForm } from "./TaskForm.js";
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
    newTaskForm()
})
eventHub.addEventListener("userFriendsStateChanged", () => {
    userFriends = useUserFriends()
    findFriends()
    render()
    
})

const render = () => {
        //loop through entries array returning each entry as passed through converter function
        // let currentUserId = parseInt(sessionStorage.getItem("activeUser"))

        // const taskFilteredMatch = tasksArray.filter(task => task.userId === currentUserId)
        // const taskFilteredNoMatch = tasksArray.filter(task => task.userId !== currentUserId)
        
        // contentTarget.innerHTML = taskFilteredMatch.map(
        //     (currentTaskObj) => {
        //         return TaskHTMLConverter(currentTaskObj) 
        //         }
        // ).join("") 
       
        // let contentNoMatchTarget = document.querySelector(".friendsTasksCheckList")
        // contentNoMatchTarget.innerHTML = taskFilteredNoMatch.map(
        // (currentTaskObj) => {
        //     return TaskHTMLConverter(currentTaskObj) 
        //         }
        // ).join("")
        const allTasksTurnedIntoHTML = friendsTasks.map(task => {
        return TaskHTMLConverter(task)
        }).join("")

        contentTarget.innerHTML = allTasksTurnedIntoHTML
         
        }        


eventHub.addEventListener("checkButtonClicked", customEvent => {

    const allTasks = useTasks()
    const taskId = event.detail.taskId
    const taskObj = allTasks.find(task => task.id === taskId)
    // console.log(taskId)

    const contentTarget = document.querySelector(".task--deadline")
    let checkedValue = document.querySelector(`#taskCheck--${taskId}`).checked

    if (checkedValue) {
        contentTarget.innerHTML = `<div class"complete">Completed!</div>`
        taskObj.complete = true

        // if (taskObj.complete === true) {
        //     checkedValue = true
        // }
        // maybe use put method to update boolean?
    } else if (checkedValue === false) {
    //   const completeDiv = document.querySelector(".complete")
      contentTarget.innerHTML = TaskList()
      taskObj.complete = false

    //   if (taskObj.complete === false) {
    //         checkedValue = false
    //     }
            // maybe use put method to update boolean?

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