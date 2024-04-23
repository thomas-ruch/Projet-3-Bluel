export async function recupererTravaux() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = reponse.json()

    return travaux
}

export function insererTravauxEtFiltres(tableau) {
    const galerie = document.querySelector(".gallery")

    console.log(tableau)

    for (let i = 0; i < tableau.length; i++) {
        let figure = document.createElement("figure")
        figure.title = `${tableau[i].category.name}`

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

        for (let i=0; i < categories.length; i++) {
            let bouton = document.createElement("button")
            bouton.textContent = `${categories[i]}`

            filtres.appendChild(bouton)
            
            bouton.addEventListener("click", () => {
                selectionneBouton(bouton)
                afficheTravaux(bouton.textContent)
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

function afficheTravaux(filtre) {
    //Sélection de tous les travaux de la galerie (<figure>)
    const figures = document.querySelectorAll(".gallery figure")
    console.log(figures)

    //Ajout ou retrait de la classe "invisible" selon le filtre en argument
    for (let i=0 ; i < figures.length ; i++) {
        if (figures[i].title != filtre && filtre !="Tous") {
            figures[i].classList.add("invisible")
        } else {
            figures[i].classList.remove("invisible")
        }
    }
}