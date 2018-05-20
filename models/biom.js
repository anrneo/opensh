var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bio_schema = new Schema({
  ope1:{nom1:String, val1:Number,val2:Number,val3:Number,val4:Number},
  ope2:{nom2:String, val1:Number,val2:Number,val3:Number,val4:Number},
  ope3:{nom3:String, val1:Number,val2:Number,val3:Number,val4:Number},
  ope4:{nom4:String, val1:Number,val2:Number,val3:Number,val4:Number},
  ope5:{nom5:String, val1:Number,val2:Number,val3:Number,val4:Number},
  ope6:{nom6:String, val1:Number,val2:Number,val3:Number,val4:Number},
  operario:{type:String},
  valor1:{type:Number},
  valor2:{type:Number},
  valor3:{type:Number},
  valor4:{type:Number},
  fecha:{type:Date, default:Date.now}
  })
var Bio = mongoose.model('Bio',bio_schema)

module.exports = Bio