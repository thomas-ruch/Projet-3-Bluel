import { recupererTravaux, insererTravauxEtFiltres, verifierMode } from "./travaux.js"
import { insererMiniatures, ajouterListenerModale } from "./modale.js"
verifierMode()

recupererTravaux().then(reponse => {
        insererTravauxEtFiltres(reponse)
        insererMiniatures(reponse)
    })

ajouterListenerModale()