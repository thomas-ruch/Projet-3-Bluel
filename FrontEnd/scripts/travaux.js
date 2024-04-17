export async function insererTravaux() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const tab = await reponse.json()

    const galerie = document.querySelector(".gallery")

    for (let i = 0; i < tab.length; i++) {
        galerie.innerHTML += `
            <figure>
                <img src="${tab[i].imageUrl}" alt="${tab[i].title}">
                <figcaption>${tab[i].title}</figcaption>
            </figure>`
        }
}

export async function insererFiltres() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const tab = await reponse.json().then((tab) => {

        //Extraction des noms de catégories de tous les travaux
        let categories = tab.map(tab => tab.category.name)

        //Tri des catégories puis suppression des catégories en doublon
        categories = categories.sort()
        for (let i = categories.length - 1; i > 0; i--) {
            if (categories[i] === categories[i - 1]) {
                categories.splice(i, 1)
            }
        }

        //Insertion des boutons-filtres dans le code HTML
        const filtres = document.querySelector(".filtres")

        categories.splice(0,0,"Tous")

        for (let i = 0; i < categories.length; i++) {
            filtres.innerHTML += `
            <button onclick="selectionneBouton(this)">${categories[i]}</button>`
        }
    })
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