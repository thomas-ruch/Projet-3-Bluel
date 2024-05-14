import { recupererTravaux, insererTravauxEtFiltres, verifierMode } from "./travaux.js"
import { insererCartes, ajouterListenerModale } from "./modale.js"

verifierMode()

recupererTravaux().then(reponse => {
        insererTravauxEtFiltres(reponse)
        insererCartes(reponse)
    })

ajouterListenerModale()