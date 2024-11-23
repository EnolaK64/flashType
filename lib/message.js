function issue(text = "") {
    const messagePopup = document.createElement("div")
    const colorbar = document.createElement("div")
    const textPopup = document.createElement("p")
    const textNode = document.createTextNode(text)
    const notifSpace = document.getElementById("notifSpace")
    
    textPopup.appendChild(textNode)

    messagePopup.appendChild(textPopup)
    messagePopup.appendChild(colorbar)
    messagePopup.classList.add("popUp")
    messagePopup.classList.add("issue")
    messagePopup.classList.add("slideLeft")
    colorbar.classList.add("colorBar")
    
    notifSpace.appendChild(messagePopup)
    notifSpace.appendChild(messagePopup)

    removeNotif(messagePopup)
}

function initPopups() {
    const notifSpace = document.createElement("div")
    notifSpace.id = "notifSpace"
    document.body.appendChild(notifSpace)

}

export { issue, initPopups }

function removeNotif(element) {
    setTimeout(() => {
        console.log('oui')

        const parentElement = element.parentElement
        console.log(parentElement)
        const firstChild = parentElement.children[0]
        firstChild.addEventListener("animationend", (e) => {
            parentElement.children[0].remove()
            for (let i = 0; i < parentElement.children.length; i++) {
                const element = parentElement.children[i];
                element.classList.remove("slideUp")
            }
        })

        for (let i = 0; i < parentElement.children.length; i++) {
            const element = parentElement.children[i];
            element.classList.add("slideUp")
            element.classList.remove("slideLeft")
        }
    }, 5000)
}

