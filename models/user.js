var mongoose = require('mongoose')
var conn = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/globo'
var openshift='mongodb://userL2H:fG7qEaCJQxVvderI@mongodb/sampledb'
mongoose.connect('mongodb://userL2H:fG7qEaCJQxVvderI@mongodb/sampledb')
var Schema = mongoose.Schema

var user_schema = new Schema({
  op: {type:Number},
  trazo: {type:Number},
  ref: {type:String},
  cliente: {type:String},
  uds: {type:Number},
  modu: {type:Number},
  est:{type:Number},
  fecha: {type: Date },
  extendido: {type: Date},
  corte: {type:Date},
  tiqueteo: {type:Date},
  preparacion: {type:Date},
  estampado:{type:Date},
  factu:{type:Number},
  id_pre:{type:Number}
})

var Corte = mongoose.model('Corte', user_schema)

module.exports = Corte
