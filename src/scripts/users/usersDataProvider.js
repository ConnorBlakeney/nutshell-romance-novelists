//author: Rebecca Parker
//purpose: to provide and manage data for users and usersFriends

const eventHub = document.querySelector('.container')

let users = []

export const useUsers = () => {
    return users.slice()
}

export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(response => response.json())
        .then(
            parsedUsers => {
                users = parsedUsers
            }
        )
}

export const saveUser = user => {
    return fetch('http://localhost:8088/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(getUsers)
    .then(dispatchUsersStateChangeEvent)
}

export const deleteUser = userId => {
    return fetch(`http://localhost:8088/users/${userId}`, {
        method: "DELETE"
    })
        .then(getUsers)
        .then(dispatchUsersStateChangeEvent)
        .catch ((error) => {
            console.log(error)
        })
}

export const editUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
    .then(getUsers)
    .then(dispatchUsersStateChangeEvent)
}

const dispatchUsersStateChangeEvent = () => {
    const userstateChangedEvent = new CustomEvent("usersStateChanged")

    eventHub.dispatchEvent(userstateChangedEvent)
    eventHub.dispatchEvent(userFriendsStateChangedEvent)
    localStorage.setItem("event", true)
    localStorage.clear()
}


let userFriends = []

export const useUserFriends = () => {
    return userFriends.slice()
}

export const getUserFriends = () => {
    return fetch("http://localhost:8088/userFriends")
        .then(response => response.json())
        .then(
            parsedUserFriends => {
                userFriends = parsedUserFriends
            }
        )
}

export const saveUserFriends = userFriend => {
    return fetch('http://localhost:8088/userFriends', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFriend)
    })
    .then(getUserFriends)
    .then(dispatchUserFriendsStateChangeEvent)
}

export const deleteUserFriends = userFriendId => {
    return fetch(`http://localhost:8088/userFriends/${userFriendId}`, {
        method: "DELETE"
    })
        .then(getUserFriends)
        .then(dispatchUserFriendsStateChangeEvent)
        .catch ((error) => {
            console.log(error)
        })
}

const dispatchUserFriendsStateChangeEvent = () => {
    const userFriendsStateChangedEvent = new CustomEvent("userFriendsStateChanged")

    eventHub.dispatchEvent(userFriendsStateChangedEvent)
    localStorage.setItem("event", true)
    localStorage.clear()
}