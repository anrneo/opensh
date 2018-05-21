var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bio_schema = new Schema({
  operario:{type:String},
  valor1:{type:Number},
  valor2:{type:Number},
  valor3:{type:Number},
  valor4:{type:Number},
  fecha:{type:Date, default:Date.now}
  })
var Bio = mongoose.model('Bio',bio_schema)

module.exports = Bio