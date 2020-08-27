export const NewsHTMLConverter = (newsObject) => {
    return `
        <section class="newsCard">
        <div class="news--title">Title: ${ newsObject.title }</div>
        <div class="news--synopsis">Synopsis: ${ newsObject.synopsis }</div>
        <div class="news--URL">URL: ${ newsObject.url }</div>
        <div class="news--date">Date: ${ newsObject.date }</div>
        <button id="deleteNews--${newsObject.id}">Delete Article</button>
        <button id="editNews--${newsObject.id}">Edit Article</button>
        </section>
            `
}