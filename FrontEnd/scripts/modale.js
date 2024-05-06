import { recupererTravaux } from "./travaux.js"

/**
 * Cette fonction affiche la modale. 
 */
function afficherModale() {
    let bckgrdModale = document.getElementById("background-modale")
    bckgrdModale.classList.remove("invisible")
}

/**
 * Cette fonction cache la modale. 
 */
function cacherModale() {
    let bckgrdModale = document.getElementById("background-modale")
    bckgrdModale.classList.add("invisible")
}

/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la modale.  
 */
function ajouterListenerModale() {
    let btnModifier = document.getElementById("btn-modifier")
    let bckgrdModale = document.getElementById("background-modale")
    let btnFermer = document.querySelector("#modale i")

    btnModifier.addEventListener("click", () => {
        afficherModale()
    })

    bckgrdModale.addEventListener("click", (event) => {
        if (event.target === bckgrdModale) {
            cacherModale()
        }
    })

    btnFermer.addEventListener("click", (event) => {
        if (event.target === btnFermer) {
            cacherModale()
        }
    })
}

function insererMiniatures(tableau) {
    let modale = document.getElementById("photos-modale")

    for (let i = 0; i < tableau.length; i++) {
        let divImage = document.createElement("div")
        let image = document.createElement("img")

        divImage.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
        divImage.classList.add("carte")

        image.src=`${tableau[i].imageUrl}`
        image.alt=`${tableau[i].title}`

        divImage.appendChild(image)
        modale.appendChild(divImage)
    }
}

function supprimerTravail() {

}


ajouterListenerModale()

recupererTravaux().then(reponse => insererMiniatures(reponse))