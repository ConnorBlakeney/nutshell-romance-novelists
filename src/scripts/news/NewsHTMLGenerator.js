export const NewsHTMLConverter = (type, newsObject) => {
    if (type === "yours"){
    return `
        <section class="newsCard--${newsObject.id}">
        <div class="news--title">Title: ${ newsObject.title }</div>
        <div class="news--synopsis">Synopsis: ${ newsObject.synopsis }</div>
        <div class="news--URL"><a href="${ newsObject.url }">View Article</a></div>
        <div class="news--date">Date: ${ newsObject.date }</div>
        <button id="deleteNews--${newsObject.id}">Delete Article</button>
        <button id="editNews--${newsObject.id}">Edit Article</button>
        </section>
            `
}
if (type === "theirs"){
    return `
        <article class="theirs">
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