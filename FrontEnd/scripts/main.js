import { recupererTravaux, insererTravauxEtFiltres, verifierMode } from "./travaux.js"

verifierMode()

recupererTravaux().then(reponse => insererTravauxEtFiltres(reponse))