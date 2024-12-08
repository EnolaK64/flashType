import * as url from "/urls.js"
export function createProfile(identity) {
    if (identity == null) {
        return loggedOutProfile()
    }
    else {
        return loggedInProfile(JSON.parse(identity))
    }

}

function loggedInProfile(identity) {
    const mainContainer = document.createElement("div")
    const scores = document.createElement("div")
    const scoreIcon = document.createElement("span")
    const iconSpan = document.createElement("span")
    const picture = new Image

    scoreIcon.classList.add("statsIcon", "icons")


    console.log(identity)
    picture.src = `${url.discordAvatar}/${identity.id}/${identity.avatar}`
    iconSpan.classList.add("icons", "hello")
    iconSpan.append(picture)
    return iconSpan
}

function loggedOutProfile() {
    const mainContainer = document.createElement("div")
    const connectionBtn = document.createElement("div")
    const connectionLink = document.createElement("a")
    const discordIcon = document.createElement("span")

    discordIcon.classList.add("discord-mark-blue", "icons")
    connectionBtn.classList.add("discordConnection")
    mainContainer.classList.add("profileContainer")

    connectionLink.href = url.discordAuth
    connectionLink.innerText = "Connect with Discord"

    mainContainer.append(discordIcon)
    connectionBtn.append(connectionLink)
    mainContainer.append(connectionBtn)

    console.log(mainContainer)
    return mainContainer
}

function offline() {
    return
}