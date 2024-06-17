import { insererCartes } from "/scripts/modale.js"

let categories = []

export async function recupererTravaux() {
    let travaux = []

    try {
        const reponse = await fetch("http://localhost:5678/api/works")
        travaux = reponse.json()
    } catch (erreur) {
        console.error("Erreur lors de la récupération des travaux.", erreur)
    }

    return travaux
}

export async function recupererCategories() {
    try {
        const reponse = await fetch("http://localhost:5678/api/categories")
        let cat = await reponse.json()
        categories = cat
    } catch (erreur) {
        console.error("Erreur lors de la récupération des catégories.", erreur)
    }
}

function insererTravail(travail) {
    const galerie = document.getElementById("galerie")

    let figure = document.createElement("figure")
    figure.dataset.categorie = `${travail.category.name}`
    figure.dataset.id = `${travail.id}`

    figure.innerHTML += `
    <img src="${travail.imageUrl}">
    <figcaption>${travail.title}</figcaption>`

    galerie.appendChild(figure)
}

function verifierTravail(travail) {

    for (let i = 0; i < categories.length; i++) {
        if (travail.category === undefined && Number(travail.categoryId) === categories[i].id) {
            let ajout = {
                "category": {
                    "id": categories[i].id,
                    "name": categories[i].name
                }
            }
            travail = Object.assign( {}, ajout, travail)
        }
    }

    return travail
}

export async function supprimerTravail(tableau, id) {
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
        },
    }

    try {
        await fetch(`http://localhost:5678/api/works/${id}`, options)
    }
    catch (erreur) {
        console.error("Erreur lors de la suppression d'un travail.", erreur)
    }

    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i].id === id) {
            tableau.splice(i, 1)
        }
    }

    insererTravaux(tableau)
    insererFiltres(tableau)
    insererCartes(tableau)

    return tableau
}

export async function envoyerTravail(form) {
    const travailFD = new FormData(form)

    travailFD.delete("image2")

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: travailFD,
    }

    try {
        let reponse = await fetch("http://localhost:5678/api/works", options)
        let travail = await reponse.json()

        travail = verifierTravail(travail)

        insererTravail(travail)
    }
    catch (erreur) {
        console.error("Erreur lors de l'envoi d'un travail.", erreur)
    }

}

export function insererTravaux(tableau) {
    const galerie = document.getElementById("galerie")

    galerie.innerHTML = ""

    for (let i = 0; i < tableau.length; i++) {
        insererTravail(tableau[i])
    }
}

function filtrerTravaux(filtre) {
    //Sélection de tous les travaux de la galerie (<figure>)
    const figures = document.querySelectorAll("#galerie figure")

    //Ajout ou retrait de la classe "invisible" selon le filtre en argument
    for (let i = 0; i < figures.length; i++) {
        if (filtre != figures[i].dataset.categorie && filtre != "Tous") {
            figures[i].classList.add("invisible")
        } else {
            figures[i].classList.remove("invisible")
        }
    }
}

export function insererCategories() {

    console.log(categories)
    const elemCat = document.getElementById("catégorie")

    for (let i = 0; i < categories.length; i++) {
        let option = document.createElement("option")
        option.value = `${categories[i].id}`
        option.innerHTML = `${categories[i].name}`
        elemCat.appendChild(option)
    }
}

export function insererFiltres(tableau) {
    //Extraction des noms de catégories de tous les travaux depuis tableau
    let categories = tableau.map(tableau => tableau.category.name)

    //Tri des catégories puis suppression des catégories en doublon
    categories = categories.sort()
    for (let i = categories.length - 1; i > 0; i--) {
        if (categories[i] === categories[i - 1]) {
            categories.splice(i, 1)
        }
    }

    //Ajout de la catégorie "Tous"
    categories.splice(0, 0, "Tous")

    //Insertion des boutons-filtres dans le code HTML
    const filtres = document.getElementById("filtres")

    filtres.innerHTML = ""

    for (let i = 0; i < categories.length; i++) {
        let bouton = document.createElement("button")
        bouton.textContent = `${categories[i]}`
        bouton.classList.add("bouton", "classique", "clicable")

        filtres.appendChild(bouton)

        bouton.addEventListener("click", () => {
            selectionneBouton(bouton)
            filtrerTravaux(bouton.textContent)
        })

        //Initialisation du premier bouton ("Tous") comme filtre actif
        if (i === 0) {
            selectionneBouton(bouton)
        }
    }
}

export function verifierMode() {
    let token = window.localStorage.getItem("token")
    let menuLogin = document.getElementById("login")
    let bandeauEdition = document.getElementById("edition")
    let btnModifier = document.getElementById("btn-modifier")
    const filtres = document.getElementById("filtres")

    //Gestion de l'affichage du bandeau "Edition" et du menu login/logout
    if (token != null) {
        bandeauEdition.classList.remove("invisible")
        btnModifier.classList.remove("invisible")
        menuLogin.href="index.html"
        menuLogin.innerText="logout"
        menuLogin.addEventListener("click", () => {
            window.localStorage.removeItem("token")
        })
        filtres.classList.add("masque")
    }
    else {
        bandeauEdition.classList.add("invisible")
        menuLogin.href="login.html"
        menuLogin.innerText="login"
    }
}

function selectionneBouton(bouton) {
    // Désélection de tous les boutons
    const boutons = document.querySelectorAll("#filtres button")
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove("selectionne")
    }

    // Sélection du bouton cliqué
    bouton.classList.add("selectionne")
}