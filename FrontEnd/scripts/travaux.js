import { insererCartes } from "/scripts/modale.js"

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
    let categories = []

    try {
        const reponse = await fetch("http://localhost:5678/api/categories")
        categories = reponse.json()
    } catch (erreur) {
        console.error("Erreur lors de la récupération des catégories.", erreur)
    }

    return categories
}

export function insererTravaux(tableau) {
    const galerie = document.querySelector(".gallery")

    galerie.innerHTML = ""

    for (let i = 0; i < tableau.length; i++) {
        let figure = document.createElement("figure")
        figure.dataset.categorie = `${tableau[i].category.name}`
        figure.dataset.id = `${tableau[i].id}`

        figure.innerHTML += `
        <img src="${tableau[i].imageUrl}" alt="${tableau[i].title}">
        <figcaption>${tableau[i].title}</figcaption>`

        galerie.appendChild(figure)
    }
}

export function insererCategories(tableau) {

    const cat = document.getElementById("catégorie")

    for (let i = 0; i < tableau.length; i++) {
        let option = document.createElement("option")
        option.value = `${tableau[i].id}`
        option.innerHTML = `${tableau[i].name}`
        cat.appendChild(option)
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
    const filtres = document.querySelector(".filtres")

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

function selectionneBouton(bouton) {
    // Désélection de tous les boutons
    const boutons = document.querySelectorAll(".filtres button")
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove("selectionne")
    }

    // Sélection du bouton cliqué
    bouton.classList.add("selectionne")
}

function filtrerTravaux(filtre) {
    //Sélection de tous les travaux de la galerie (<figure>)
    const figures = document.querySelectorAll(".gallery figure")

    //Ajout ou retrait de la classe "invisible" selon le filtre en argument
    for (let i = 0; i < figures.length; i++) {
        if (filtre != figures[i].dataset.categorie && filtre != "Tous") {
            figures[i].classList.add("invisible")
        } else {
            figures[i].classList.remove("invisible")
        }
    }
}

export function verifierMode() {
    let token = window.localStorage.getItem("token")

    //Bandeau "édition" est invisible
    let bandeauEdition = document.getElementById("edition")
    bandeauEdition.classList.add("invisible")

    //Si un utilisateur s'est connecté, affichage du bouton de modification
    //et du bandeau "édition"
    if (token != null) {
        let btnModifier = document.getElementById("btn-modifier")

        bandeauEdition.classList.remove("invisible")
        btnModifier.classList.remove("invisible")
    }
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

    console.log("Tableau avant traitement :", tableau)

    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i].id === id) {
            tableau.splice(i, 1)
        }
    }
    console.log("Tableau après traitement :", tableau)

    insererTravaux(tableau)
    insererFiltres(tableau)
    insererCartes(tableau)

    return tableau
}

export function envoyerTravail(form) {
    console.log(form)

    const travailFD = new FormData(form)

    let tabImages = travailFD.getAll("image")

    for (let i = 0; i < tabImages.length; i++) {
        if (tabImages[i].size === 0) {
            tabImages.splice(i, 1)
        }
    }

    travailFD.delete("image")
    travailFD.append("image", tabImages[0])

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        },
        body: travailFD,
    }

    try {
        fetch("http://localhost:5678/api/works", options)
    }
    catch (erreur) {
        console.error("Erreur lors de l'envoi d'un travail.", erreur)
    }
}