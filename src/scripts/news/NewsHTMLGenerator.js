import { getUsers, useUsers } from "../users/usersDataProvider.js"

export const NewsHTMLConverter = (type, newsObject) => {
    if (type === "yours"){
    return `
        <div class="friend--name">${getFriendName(newsObject)}'s Article</div>
        <section class="newsCard--${newsObject.id}">
        <div class="news--title">Title: ${ newsObject.title }</div>
        <div class="news--title">Title: ${ newsObject.title }</div>
        <div class="news--synopsis">Synopsis: ${ newsObject.synopsis }</div>
        <div class="news--URL"><a href=${ newsObject.url }>View Article</a></div>
        <div class="news--date">Date: ${ newsObject.date }</div>
        <button id="deleteNews--${newsObject.id}">Delete Article</button>
        <button id="editNews--${newsObject.id}">Edit Article</button>
        </section>
            `
}
if (type === "theirs"){
    return `
        <article class="theirs">
        <div class="friend--name">${getFriendName(newsObject)}'s Article</div>
        <section class="newsCard--${newsObject.id}">
        <div class="news--title">Title: ${ newsObject.title }</div>
        <div class="news--synopsis">Synopsis: ${ newsObject.synopsis }</div>
        <div class="news--URL"><a href="${ newsObject.url }">View Article</a></div>
        <div class="news--date">Date: ${ newsObject.date }</div>
        </section>
        <article>
            `
}
}

const getFriendName = (eventObj) => {
   
    const users = useUsers()
    const friendObj = users.find(u => u.id === eventObj.userId)
    const name = friendObj.username
    console.log(name)
    return name
 }