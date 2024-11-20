import {drawIcons} from "../../lib/drawIcons.js"

const icons = ["returnIcon"]
drawIcons(icons)


    


const tabs = document.querySelectorAll(".tabs")
const theme = localStorage.getItem("theme")
if (theme === "dark") {
    document.body.classList.add("dark")
}

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', (e) => {
        const selected = document.querySelector(".selected")
        if (selected != null) {
            selected.classList.remove("selected")
        }


        const frameSelected = document.querySelector(".frame-select")

        if (frameSelected != null) {
            frameSelected.classList.remove("frame-select")
        }
        console.log(e.target.id + "-frame")
        const frame = document.getElementById(e.target.id + "-frame")
        e.target.classList.add("selected")
        console.log(frame);

        frame.classList.add("frame-select")
    })
}


async function getJSON() {
    try {
        const response = await fetch("https://server.flashtype.fr/leaderboard");

        const resultat = await response.json();
        displayStats(resultat)
    } catch (erreur) {
        console.error("Erreur :", erreur);
    }
}
getJSON()
function createElement(name, score, elementToAppend, suffix) {
    const element = document.createElement("p")
    if (suffix === undefined) {
        suffix = ""
    }
    const textNode = document.createTextNode(name + ": " + score + suffix)
    element.appendChild(textNode)
    elementToAppend.appendChild(element)
}

function displayStats(data) {
    const frames = document.querySelectorAll(".frames")
    console.log(data)
    for (let i = 0; i < frames.length; i++) {
        for (let j = 0; j < data[frames[i].id.split("-")[0]].length; j++) {
            const element = data[frames[i].id.split("-")[0]][j];
            if (frames[i].id === "timePlayed-frame") {
                element[0] /= 60
                element[0] /= 60
                element[0] = Math.round(element[0] * 100) / 100
                console.log(element[0]);

                createElement(element[1], element[0], frames[i], "h")
            }
            else {
                createElement(element[1], element[0], frames[i])
            }
        }
    }
}


