export async function insererTravaux() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const tab = await reponse.json().then((tab) => {
        
        const galerie = document.querySelector(".gallery")

        for (let i = 0; tab.length; i++) {
            galerie.innerHTML += `
            <figure>
                <img src="${tab[i].imageUrl}" alt="${tab[i].title}">
                <figcaption>${tab[i].title}</figcaption>
            </figure>`
        }
    })
}