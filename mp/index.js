import * as lib from "../lib/loader.js"
import * as url from "/urls.js"
import { initPopups, issue } from "../lib/message.js"
let mode = ["login"]
let theme = localStorage.getItem("theme")
if (theme === "dark") {
    document.body.classList.add("dark")
}
initPopups()

async function postJSON(donnees) {
    try {
        const reponse = await fetch(`${url.flashtype}/${mode[0]}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donnees),
            "Access-Control-Allow-Origin": "*",
        });

        const resultat = await reponse.json();
        console.log(resultat);
        return resultat
    } catch (erreur) {
        console.error("Erreur :", erreur);
    }
}

async function submit(data) {


    const donnees = {
        "username": data[0],
        "password": data[1]
    };
    const serverResponse = await postJSON(donnees);
    const login = document.getElementById("loginPage").querySelector(".messages")
    const signup = document.getElementById("signupPage").querySelector(".messages")
    console.log(serverResponse.exist)
    //when successfully created account
    if (serverResponse.exist === false && mode[0] === "signup") {
        console.log(serverResponse);
        sessionStorage.setItem("token", serverResponse.token)
        redirect()


    }
    //when the username is already taken
    else if (serverResponse.exist === true && mode[0] === "signup") {
        issue("This username already exist")
    }
    //when successfully loged
    else if (serverResponse.exist === true && mode[0] === "login") {
        sessionStorage.setItem("token", serverResponse.token)
        redirect()
    }
    //when the password is wrong
    else if (serverResponse.exist === "password") {
        issue("Invalid password")
    }
    else if (serverResponse.exist === false && mode[0] === "login") {
        issue("This account doesn't exist")
    }
}



function redirect() {
    const mainPage = document.createElement("a")
    mainPage.setAttribute("href", "/")
    mainPage.style.display = "none"
    document.body.appendChild(mainPage)
    mainPage.click()
}
const submitButton = document.querySelectorAll(".submitBtn")

for (let i = 0; i < submitButton.length; i++) {

    submitButton[i].addEventListener("click", (e) => {
        e.currentTarget.innerHTML = ""
        e.currentTarget.append(lib.createLoader("var(--blue)"))
        getData(e.currentTarget.parentElement)
    })
}


function getData(element) {
    const username = element.querySelector(".username")
    const password = element.querySelector(".password")
    const checkbox = element.querySelector("#checkbox")

    if (mode[0] === "signup") {
        if (checkbox.checked === false) {
            issue("You need to accept the policy")
            return
        }
    }
    if (username.value === "" || password.value === "") {
        issue("Please fill all fields")
        console.error("Empty field")
    }

    else {
        submit([username.value, password.value])
    }
}

const submitBtns = {
    "login": document.getElementById("submitLogin"),
    "sign": document.getElementById("submitSign")
}


// function issue(issue, errorElement) {
//     if (errorElement.childNodes.length > 0) {
//         errorElement.childNodes[0].remove()
//     }

//     const issuesContainer = document.createElement("p")
//     const issuesNode = document.createTextNode(issue)
//     issuesContainer.appendChild(issuesNode)
//     errorElement.appendChild(issuesContainer)
//     errorElement.classList.add("shake")

//     const pageButton = mode[1].querySelector(".submitBtn")
//     pageButton.childNodes[0].remove()
//     pageButton.innerHTML = toUpperCaseFirstLetter(mode[0])

// }

const accounts = document.querySelectorAll(".account")
for (let i = 0; i < accounts.length; i++) {
    accounts[i].addEventListener("click", (e) => {
        mode[0] = e.currentTarget.id.split("Page")[0]

        mode[1] = e.currentTarget
        console.log(mode[1]);
        if (e.currentTarget.classList[1] === "collapsed") {
            if (e.currentTarget === accounts[0]) {
                accounts[1].classList.add("collapsed")
                accounts[0].classList.remove("collapsed")
            }
            else {
                accounts[0].classList.add("collapsed")
                accounts[1].classList.remove("collapsed")
            }
        }
    })

}

function toUpperCaseFirstLetter(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}


