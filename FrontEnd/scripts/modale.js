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
    const modale = document.getElementById("photos-modale")

    for (let i = 0; i < tableau.length; i++) {
        let divImage = document.createElement("div")
        let image = document.createElement("img")

        divImage.innerHTML = `<i class="btn-supprimer clicable fa-solid fa-trash-can fa-xs"></i>`
        divImage.classList.add("carte")
        divImage.dataset.id = `${tableau[i].id}`

        image.src = `${tableau[i].imageUrl}`
        image.alt = `${tableau[i].title}`

        divImage.appendChild(image)
        modale.appendChild(divImage)
    }
}

export function ajouterListenerModale() {
    const btnModifier = document.getElementById("btn-modifier")
    const bckgrdModale = document.getElementById("background-modale")
    const btnFermer = document.querySelectorAll("#background-modale .btn-fermer")
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

    setTimeout(() => {
        let boutonsSupprimer = document.querySelectorAll("#photos-modale .btn-supprimer")
        console.log(boutonsSupprimer)

        for (let i = 0; i < boutonsSupprimer.length; i++) {
            boutonsSupprimer[i].addEventListener("click", () => {
                supprimerTravail(boutonsSupprimer[i].parentNode.dataset.id)
            })
        }
    }, 200)
}

async function supprimerTravail(id) {
    const options = {
        method: "DELETE",
        headers: {
            // "Content-Type": "*",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
        },
    }
    console.log(options)

    try {
        await fetch(`http://localhost:5678/api/users/works/${id}`, options)
    }
    catch (erreur) {
        console.error("Erreur lors de la suppression d'un travail.", erreur)
    }
}