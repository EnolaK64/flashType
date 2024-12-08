import { redirect } from "/lib/redirect.js"
const code = window.location.search

getTokens(code)


async function getTokens(code) {
    try {
        const reponse = await fetch(`http://localhost:1500/discord/auth/token${code}`);
        const resultat = await reponse.json();
        console.log(resultat);
        localStorage.setItem("refreshToken", JSON.stringify(resultat[0].discord))
        localStorage.setItem("identity", JSON.stringify(resultat[1]))
        localStorage.setItem("flashtype", JSON.stringify(resultat[0].flashtype))
        redirect("/")
    } catch (erreur) {
        console.error("Erreur :", erreur);
    }
}