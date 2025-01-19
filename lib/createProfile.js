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
    
    const scoresDiv = document.createElement("div")
    const scoresIcon = document.createElement("span")
    
    scoresIcon.classList.add("statsIcon", "icons")
    scoresDiv.classList.add("scoresDiv", "profileDiv")
    
    scoresDiv.append(scoresIcon)
    
    const logoutDiv = document.createElement("div")
    const logoutIcon = document.createElement("span")

    logoutIcon.classList.add("icons", "logoutIcon")
    logoutDiv.classList.add("logoutDiv", "profileDiv")

    logoutDiv.append(logoutIcon)

    mainContainer.classList.add("profileContainer", "logged")

    mainContainer.append(scoresDiv)
    mainContainer.append(logoutDiv)

    const picture = new Image


    console.log(identity)
    picture.src = `${url.discordAvatar}/${identity.id}/${identity.avatar}`
    // scoreIcon.append(picture)
    return mainContainer
    
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
    mainContainer.style.width = "fit-content"
    // mainContainer.style.display = "none"


    console.log(mainContainer)
    mainContainer.classList.add("test")
    const test = document.body.append(mainContainer)
    // console.log(test, "test")
    // const container = document.querySelector(".test")
    console.log("here", container.clientWidth)
    return mainContainer
}

function offline() {
    return
}