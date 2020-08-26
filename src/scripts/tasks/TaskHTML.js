// author: Connor Blakeney
// purpose: module converts tasks into HTML format

export const TaskHTMLConverter = (task) => {
    return `
    <section class="individualTask">
        <input type="checkbox" id="task--${task.id}" name="task--${task.id}" value="Task ${task.id}">
        <label for="task--${task.id}">${task.task}</label><br>
        <div id= "deadline--${task.id}" class="task--deadline">Task Deadline: ${new Date(
              task.deadline
            ).toLocaleDateString("en-US")}</div>
        <button id="deleteBtn--${task.id}">Delete</button>
        <button id="editBtn--${task.id}">Edit</button>
    </section>
`
}