import { recupererTravaux, insererTravaux, insererFiltres } from "./travaux.js"

recupererTravaux().then(test => insererTravaux(test))

insererFiltres()

