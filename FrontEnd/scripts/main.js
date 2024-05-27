import { recupererTravaux, insererTravaux, insererFiltres, verifierMode, recupererCategories, insererCategories } from "./travaux.js"
import { insererCartes, ajouterListenerModale } from "./modale.js"

let travaux = []

verifierMode()

// Préparation de la page principale
recupererTravaux().then((reponse) => {
    travaux = reponse

    insererTravaux(travaux)
    insererFiltres(travaux)
    insererCartes(travaux)   
})

//Préparation de la modale
recupererCategories().then((cat => {
    insererCategories(cat)
}))
ajouterListenerModale()