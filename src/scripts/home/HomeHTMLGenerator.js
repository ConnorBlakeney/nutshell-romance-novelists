export const NewsHTMLConverter = (newsObject) => {
    return `
        <section class="newsCard">
        <div class="note--title">Title: ${ newsObject.title }</div>
        <div class="note--title">Synopsis: ${ newsObject.synopsis }</div>
        <div class="note--title">Date: ${ newsObject.date }</div>
        <button id="deleteNews--${newsObject.id}">Delete Article</button>
        <button id="editNews--${newsObject.id}">Edit Article</button>
        </section>
            `
}