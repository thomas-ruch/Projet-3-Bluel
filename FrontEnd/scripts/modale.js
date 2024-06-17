import { supprimerTravail, envoyerTravail } from "/scripts/travaux.js"

function afficherModale() {
    const bckgrdModale = document.getElementById("background-modale")
    const modale = document.getElementById("modale")
    const modaleP2 = document.getElementById("modale-page2")

    bckgrdModale.classList.remove("invisible")
    modale.classList.remove("invisible")
    modaleP2.classList.add("invisible")

    reinitialiserFormulaire()
}

function cacherModale() {
    const bckgrdModale = document.getElementById("background-modale")
    const modaleP2 = document.getElementById("modale-page2")

    bckgrdModale.classList.add("invisible")
    modaleP2.classList.add("invisible")
}

export function insererCartes(tableau) {
    const photosModale = document.getElementById("cartes")

    photosModale.innerHTML = ""

    for (let i = 0; i < tableau.length; i++) {
        let divImage = document.createElement("div")
        let image = document.createElement("img")
        let poubelle = document.createElement("i")

        divImage.classList.add("carte")
        poubelle.classList.add("btn-supprimer", "clicable", "fa-solid", "fa-trash-can", "fa-xs")

        poubelle.addEventListener("click", () => {
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
    // Ajout des listeners aux boutons
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

    // Ajout des listeners aux inputs et aux submits
    const inputTitre = document.getElementById("titre")

    inputTitre.addEventListener("input", () => {
        verifierFormulaire()
    })

    const formulaire = document.querySelector("#modale-page2 form")

    formulaire.addEventListener("submit", (event) => {
        event.preventDefault()
        envoyerTravail(formulaire)
    })
    
}

export function afficherPreviewPhoto() {

    const inputPhoto = document.querySelector("#ajout-photo input")
    const ajoutPhoto = document.getElementById("ajout-photo")
    const previewPhoto = document.getElementById("preview-photo")
    const imgPreviewPhoto = document.querySelector("#preview-photo img")

    inputPhoto.addEventListener("change", () => {
        let fichiers = inputPhoto.files

        if (fichiers.length > 0 && verifierFichier(fichiers[0])) {
            imgPreviewPhoto.src = window.URL.createObjectURL(fichiers[0])
            previewPhoto.classList.remove("invisible")
            ajoutPhoto.classList.add("invisible")
        }

        verifierFormulaire()
    })
}

function verifierFichier(fichier) {
    const fichierRegExp = new RegExp("\.(?:jpe?g|png)$", "i")
    let retour = false

    if (fichierRegExp.test(fichier.name) && fichier.size < 4200000) {
        retour = true
        console.log("Le fichier " + fichier.name + " est valide.")
    } else {
        console.log("Le fichier " + fichier.name + " n'est pas valide.")
    }

    return retour
}

function reinitialiserFormulaire() {
    const ajoutPhoto = document.getElementById("ajout-photo")
    const previewPhoto = document.getElementById("preview-photo")
    const formulaire = document.querySelector("#modale-page2 form")

    previewPhoto.classList.add("invisible")
    ajoutPhoto.classList.remove("invisible")

    formulaire.reset()

    verifierFormulaire() 
}

function verifierFormulaire() {
    const inputPhoto = document.getElementById("photo")
    const inputTitre = document.getElementById("titre")
    const btnValider = document.getElementById("btn-valider")

    if (inputPhoto.files.length != 0 && inputTitre.value != "") {
        btnValider.disabled = false
        btnValider.classList.remove("desactive")
        btnValider.classList.add("selectionne", "clicable")
    } else {
        btnValider.classList.add("desactive")
        btnValider.classList.remove("selectionne", "clicable")
    }
}