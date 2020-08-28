// author: Rebecca Parker
// purpose: To filter and list users based on if they are friends with the current user 
//          and allow current user to search all users


import { getUsers, getUserFriends, useUsers, useUserFriends } from "../users/usersDataProvider.js"
import { friendHTML } from "./FriendHTML.js"

const contentTarget = document.querySelector(".allUserSearch")
const eventHub = document.querySelector(".container")


let users = []
let userFriends =[]
let friends = []

export const friendList = () => {
    getUsers()
    .then(getUserFriends)
    .then(() => {
        users = useUsers()
        userFriends = useUserFriends()
        findFriends()
        render()
    })
    
}

 window.addEventListener("storage", () => {
     friendList()
    
})

eventHub.addEventListener("usersStateChanged", () => {
    let newUsers = useUsers()
    users = newUsers.filter(user => users.find(u => u === user))
    userFriends = useUserFriends()
    findFriends()
    render()
})

eventHub.addEventListener("userFriendsStateChanged", () => {
    userFriends = useUserFriends()
    let newUsers = useUsers()
    users = newUsers.filter(user => users.find(u => u === user))
    findFriends()
    render()
    
})


eventHub.addEventListener("click", event => {
    if (event.target.id === "searchFriendsButton"){
        const searchTarget = document.querySelector("#searchFriends")
        const searchValue = searchTarget.value.toLowerCase()
        if(searchTarget.value){

            users = useUsers()
            users = users.filter(user => user.username.toLowerCase().includes(searchValue))
            findFriends()
            render()  
        }
    }
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "showAll"){
        users = useUsers()
        findFriends()
        render()

    }
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "showCurrent"){
        users = useUsers()
        findFriends()
        users = friends
        render()
    }
})


const findFriends = () => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))

    let currentRelationships = userFriends.filter(f => {
        if(currentUserId === f.userId || currentUserId === f.friendId ){
            return f
        }
    })
    for (let i = 0; i < users.length; i ++) {
        
        if(users[i].id === currentUserId){
                users.splice(i, 1)

        }
    }
    
    friends = currentRelationships.map(r => {
        return users.find(user => {
            if(user.id === r.userId || user.id === r.friendId){
                if(user.id != currentUserId){
                    return user
                }
            }
        })
    })


    users = users.map(user => {
        if (friends.includes(user)){
            user.friend = true
        }else{
            user.friend = false
        }
        return user
    })
}


const render = () => {
        
    const html = users.map(user => friendHTML(user)).join("")
    
    contentTarget.innerHTML =
        `
        <div class="searchform">
            <h3> Friends </h3>
            <input type="text" id="searchFriends" placeholder="Search All Users">
            <button id="searchFriendsButton">Search</button>
            <div>
                <button id="showAll">Show All Users</button>
                <button id="showCurrent">Show Current Friends</button>
            </div>
        </div>
        ${html}
        `
}