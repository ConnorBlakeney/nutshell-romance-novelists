export const provideContent = () => {
    return `
    <article class="dashboard--left">
            <h3 class="weatherTitle">Current Weather</h3>
            <br></br>
            <div class="weatherContainer"></div>
        </article>
        <article class="dashboard--center">
            <div class="tasksContainer"></div>
            <div class="tasksCheckList"></div>
            <div class="newsFormContainer"></div>
            <div class="editNewsContainer"></div>
            <div class="newsContainer"></div>
        </article>

        <article class="dashboard--right">
            <div class="friendsContainer">
                <div class="friendsLeftContainer">
                    <section class="messages">Messages
                        <section class="messageObject--section"></section>
                        <button class="newMessageButton">New</button>
                        <section class="messageInput--section"></section>
                    </section>
                </div>
                <div class="friendsRightContainer"></div>
                    <div class="allUserSearch"></div>
                    <div class="currentFriends"></div>
        </article>
        <footer class="dashboard--bottom">
                <div class="eventFormContainer"></div>
                <div class="eventListContainer"></div>
        </footer>`
}