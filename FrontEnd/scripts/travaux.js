export async function recupererTravaux() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = await reponse.json()

    return travaux
}

export function insererTravauxEtFiltres(tableau) {
    const galerie = document.querySelector(".gallery")

    for (let i = 0; i < tableau.length; i++) {
        let figure = document.createElement("figure")
        figure.dataset.categorie = `${tableau[i].category.name}`

        figure.innerHTML += `
            <img src="${tableau[i].imageUrl}" alt="${tableau[i].title}">
            <figcaption>${tableau[i].title}</figcaption>`

        galerie.appendChild(figure)
    }

    insererFiltres(tableau)
}

function insererFiltres(tableau) {
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

    for (let i = 0; i < categories.length; i++) {
        let bouton = document.createElement("button")
        bouton.textContent = `${categories[i]}`

        filtres.appendChild(bouton)

        bouton.addEventListener("click", () => {
            selectionneBouton(bouton)
            filtreTravaux(bouton.textContent)
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
        boutons[i].classList.remove("btn-selectionne")
    }

    // Sélection du bouton cliqué
    bouton.classList.add("btn-selectionne")
}

function filtreTravaux(filtre) {
    //Sélection de tous les travaux de la galerie (<figure>)
    const figures = document.querySelectorAll(".gallery figure")
    console.log(figures)

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
    let utilisateur = window.localStorage.getItem("utilisateur")
    utilisateur = JSON.parse(utilisateur)
    console.log(utilisateur)

    //Bandeau "édition" est invisible
    let bandeauEdition = document.querySelector("header div:nth-child(1)")
    bandeauEdition.classList.add("invisible")

    //Si un utilisateur s'est connecté, création du bouton de modification
    //et activation du bandeau "édition"
    if (utilisateur != null) {
        let titre = document.querySelector("#portfolio .titre")

        bandeauEdition.classList.remove("invisible")

        let btnModifier = document.createElement("button")
        btnModifier.textContent = "Modifier"

        let icone = document.createElement("i")
        icone.classList.add("slip")
        titre.appendChild(icone)
        titre.appendChild(btnModifier)
    }
}