import { recupererTravaux, insererTravauxEtFiltres } from "./travaux.js"

recupererTravaux().then(reponse => insererTravauxEtFiltres(reponse))