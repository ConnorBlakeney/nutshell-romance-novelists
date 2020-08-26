// creates an object from a user's message that can be POSTed to a json database

const createMessageObject = (userId, message) => {
    return {
        "userId": parseInt(userId),
        "message": message,
        "date": Date.now()

    }
}

export default createMessageObject