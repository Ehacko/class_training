const { inherits } = require("util")
let species_stats = {};

species_stats.humans = {
  sante: {
    min: Number,
    max: Number,
    value: Number,
  },
  vigueur: {
    min: Number,
    max: Number,
    value: Number,
  },
  mobilite: {
    min: Number,
    max: Number,
    value: Number,
  },
  faille: {
    min: Number,
    max: Number,
    value: Number,
  },
  fragilite: {
    min: Number,
    max: Number,
    value: Number,
  },
  rusticite: {
    min: Number,
    max: Number,
    value: Number,
  },
  mental: {
    min: Number,
    max: Number,
    value: Number,
  }
}

class Species {
  constructor(info) {
    this._sante = info.sante
    this._vigueur = info.vigueur
    this._mobilite = info.mobilite
    this._faille = info.faille
    this._fragilite = info.fragilite
    this._rusticite = info.rusticite
    this._mental = info.mental
  }
}
class Human extends Species {
  constructor(){
    super(get_stats(species_stats.humans))
  }
}