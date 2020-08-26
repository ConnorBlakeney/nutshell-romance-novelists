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
    const userstateChangedEvent = new CustomEvent("userstateChanged")

    eventHub.dispatchEvent(userstateChangedEvent)
}

let usersFriends = []

export const useUsersFriends = () => {
    return usersFriends.slice()
}

export const getUsersFriends = () => {
    return fetch("http://localhost:8088/usersFriends")
        .then(response => response.json())
        .then(
            parsedUsersFriends => {
                usersFriends = parsedUsersFriends
            }
        )
}

export const saveUsersFriends = userFriend => {
    return fetch('http://localhost:8088/usersFriends', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userFriend)
    })
    .then(getUsersFriends)
    .then(dispatchUsersFriendsStateChangeEvent)
}

export const deleteUsersFriends = userFriendId => {
    return fetch(`http://localhost:8088/users/${userFriendId}`, {
        method: "DELETE"
    })
        .then(getUsersFriends)
        .then(dispatchUsersFriendsStateChangeEvent)
        .catch ((error) => {
            console.log(error)
        })
}

const dispatchUsersFriendsStateChangeEvent = () => {
    const usersFriendsStateChangedEvent = new CustomEvent("usersFriendsStateChanged")

    eventHub.dispatchEvent(usersFriendsStateChangedEvent)
}