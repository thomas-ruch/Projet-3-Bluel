export async function recupererTravaux() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const tab = reponse.json()

    return tab
}

export function insererTravaux(tableau) {
    const galerie = document.querySelector(".gallery")

    for (let i = 0; i < tableau.length; i++) {
        galerie.innerHTML += `
            <figure>
                <img src="${tableau[i].imageUrl}" alt="${tableau[i].title}">
                <figcaption>${tableau[i].title}</figcaption>
            </figure>`
        }
}

export function insererFiltres(tableau) {
        //Extraction des noms de catégories de tous les travaux
        let categories = tableau.map(tab => tableau.category.name)

        //Tri des catégories puis suppression des catégories en doublon
        categories = categories.sort()
        for (let i = categories.length - 1; i > 0; i--) {
            if (categories[i] === categories[i - 1]) {
                categories.splice(i, 1)
            }
        }

        //Ajout du filtre "Tous"
        categories.splice(0, 0, "Tous")

        //Insertion des boutons-filtres dans le code HTML
        const filtres = document.querySelector(".filtres")


        for (let i = 0; i < categories.length; i++) {
            filtres.innerHTML += `
            <button>${categories[i]}</button>`
        }
}

function selectionneBouton(bouton) {
    // Désélectionne tous les boutons
    const boutons = document.querySelectorAll(".filtres button")
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove("btn-selectionne")
    }

    // Sélectionne le bouton cliqué
    bouton.classList.add("btn-selectionne")
}