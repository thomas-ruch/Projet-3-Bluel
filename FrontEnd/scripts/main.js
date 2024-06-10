import { recupererTravaux, insererTravaux, insererFiltres, verifierMode, recupererCategories, insererCategories, envoyerTravail } from "./travaux.js"
import { insererCartes, ajouterListenerModale, afficherPreviewPhoto } from "./modale.js"

let travaux = []

verifierMode()

// Fonctionnement de la page principale
recupererTravaux().then((reponse) => {
    travaux = reponse

    insererTravaux(travaux)
    insererFiltres(travaux)
    insererCartes(travaux)   
})

// Fonctionnement de la modale
recupererCategories().then((cat => {
    insererCategories(cat)
}))
ajouterListenerModale()
afficherPreviewPhoto()