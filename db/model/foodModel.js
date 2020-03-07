const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var foodschema = new Schema({
    //这些根据需求自己写
  name:{type:String,required:true},
  price:{type:String,required:true},
  desc:{type:String,required:true},
  typename: {type:String,required:true},
  typeid: {type:Number,required:true},
  img:{type:String,required:true}
})
var Food = mongoose.model('foods',foodschema); 
module.exports = Food