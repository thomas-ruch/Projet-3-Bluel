function afficherModale() {
    let bckgrdModale = document.getElementById("background-modale")
    bckgrdModale.classList.remove("invisible")
}

function cacherModale() {
    let bckgrdModale = document.getElementById("background-modale")
    bckgrdModale.classList.add("invisible")
}

export function ajouterListenerModale() {
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

export function insererMiniatures(tableau) {
    let modale = document.getElementById("photos-modale")

    for (let i = 0; i < tableau.length; i++) {
        let divImage = document.createElement("div")
        let image = document.createElement("img")

        divImage.innerHTML = `<i class="btn-supprimer fa-solid fa-trash-can fa-xs"></i>`
        divImage.classList.add("carte")

        image.src=`${tableau[i].imageUrl}`
        image.alt=`${tableau[i].title}`

        divImage.appendChild(image)
        modale.appendChild(divImage)
    }
}

function supprimerTravail() {

}