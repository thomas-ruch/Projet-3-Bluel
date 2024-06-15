import { recupererTravaux, insererTravaux, insererFiltres, verifierMode, recupererCategories, insererCategories, envoyerTravail } from "./travaux.js"
import { insererCartes, ajouterListenerModale, afficherPreviewPhoto } from "./modale.js"

verifierMode()

// Fonctionnement de la page principale
recupererTravaux().then((travaux) => {
    insererTravaux(travaux)
    insererFiltres(travaux)
    insererCartes(travaux)
})

// Fonctionnement de la modale
recupererCategories().then(() => {
    insererCategories()
})
ajouterListenerModale()
afficherPreviewPhoto()