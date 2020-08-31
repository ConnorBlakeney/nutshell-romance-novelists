//author: Red Tilson
//purpose: This component differentiates between user and friend
//submitted articles and generates the HTML, returning the result
// to NewsList.js

import {useUsers} from "../users/usersDataProvider.js"
export const NewsHTMLConverter = (type, newsObject) => {
    if (type === "yours"){
    return `
        <article class="yours">
        <div class="friend--name">${getFriendName(newsObject)}'s event</div>
        <section class="newsCard--${newsObject.id}">
        <div class="news--title">Title: ${ newsObject.title }</div>
        <div class="news--synopsis">Synopsis: ${ newsObject.synopsis }</div>
        <div class="news--URL"><a href="${ newsObject.url }">View Article</a></div>
        <div class="news--date">Date: ${ newsObject.date }</div>
        <button id="deleteNews--${newsObject.id}">Delete Article</button>
        <button id="editNews--${newsObject.id}">Edit Article</button>
        </section>
        <article>
            `
}
if (type === "theirs"){
    return `
        <article class="theirs">
        <div class="friend--name">${getFriendName(newsObject)}'s event</div>
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
    return name
 }