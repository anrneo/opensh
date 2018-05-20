var mongoose = require('mongoose')
var Schema = mongoose.Schema

var img_schema = new Schema({
  dia:{type:Date},
  ex_dia:{type:Number},
  ex_noche:{type:Number},
  ex_dom:{type:Number},
  rec_noc:{type:Number},
  personas:{type:Number},
  extras:{type:Number},
  cos_ext:{type:Number},
  cos_mod:{type:Number},
  fact:{type:Number},
  costot:{type:Number},
  util:{type:Number},
  suma_uds:{type:Number}
  })
var Matriz = mongoose.model('Matriz',img_schema)

module.exports = Matriz