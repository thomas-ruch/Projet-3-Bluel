import { supprimerTravail } from "/scripts/travaux.js"

function afficherModale() {
    const bckgrdModale = document.getElementById("background-modale")
    const modale = document.getElementById("modale")
    const modaleP2 = document.getElementById("modale-page2")

    bckgrdModale.classList.remove("invisible")
    modale.classList.remove("invisible")
    modaleP2.classList.add("invisible")
}

function cacherModale() {
    const bckgrdModale = document.getElementById("background-modale")
    const modaleP2 = document.getElementById("modale-page2")

    bckgrdModale.classList.add("invisible")
    modaleP2.classList.add("invisible")
}

export function insererCartes(tableau) {
    const photosModale = document.getElementById("photos-modale")

    photosModale.innerHTML = ""

    for (let i = 0; i < tableau.length; i++) {
        let divImage = document.createElement("div")
        let image = document.createElement("img")
        let poubelle = document.createElement("i")

        divImage.classList.add("carte")
        poubelle.classList.add("btn-supprimer", "clicable", "fa-solid", "fa-trash-can", "fa-xs")
        
        poubelle.addEventListener("click", (event) => {
            event.preventDefault()
            supprimerTravail(tableau, tableau[i].id)
        })

        image.src = `${tableau[i].imageUrl}`
        image.alt = `${tableau[i].title}`
        
        divImage.appendChild(poubelle)
        divImage.appendChild(image)
        photosModale.appendChild(divImage)   
    }
}

export function ajouterListenerModale() {
    // Ajout des listeners aux boutons "simples"
    const btnModifier = document.getElementById("btn-modifier")
    const bckgrdModale = document.getElementById("background-modale")
    const btnFermer = document.querySelectorAll("#background-modale .btn-fermer")
    const btnPrecedent = document.getElementById("btn-precedent")
    const btnAjoutPhoto = document.getElementById("btn-ajouter-photo")

    btnModifier.addEventListener("click", () => {
        afficherModale()
    })

    bckgrdModale.addEventListener("click", (event) => {
        if (event.target === bckgrdModale) {
            cacherModale()
        }
    })

    for (let i = 0; i < btnFermer.length; i++) {
        btnFermer[i].addEventListener("click", () => {
            cacherModale()
        })
    }

    const modale = document.getElementById("modale")
    const modaleP2 = document.getElementById("modale-page2")

    btnAjoutPhoto.addEventListener("click", () => {
        modale.classList.add("invisible")
        modaleP2.classList.remove("invisible")
    })

    btnPrecedent.addEventListener("click", () => {
        afficherModale()
    })
}

function inserer(element) {

    const hauteurFenetre = window.innerHeight

    hauteur = element.offsetHeight

    if (hauteur > hauteurFenetre) {
        
    }
}