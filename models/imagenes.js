var mongoose = require('mongoose')
var Schema = mongoose.Schema

var img_schema = new Schema({
  extension:{type:String},
  referencia:{type:String},
  cliente:{type: String}
  })
var Imagen = mongoose.model('Imagen',img_schema)

module.exports = Imagen