const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  type:String,
  place:String,
  oPrice:Number,
  sPrice:Number,
  isNego:String,
  product: String,
  specs: String,
  category: String,
  email:String,
  date:{
    type:Date,
    default:Date.now
  },
  contact:String,
  images:[String],
  customers:[String],
  wishlist:[String],
  acceptedTo:String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
