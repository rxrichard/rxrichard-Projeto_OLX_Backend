const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise;


const modelSchema = new mongoose.Schema({ 
    idUser: String,
    state: String,
    category: String,
    images:[Object], 
    dateCreated: Date,
    title: String,
    description: String,
    price:Number,
    priceNegociable: Boolean,
    views: Number,
    status: String

});

const modelName = 'Ad'; //nome do model

if(mongoose.connection && mongoose.connection.models[modelName]){
  module.exports = mongoose.connection.models[modelName];
}else{
  module.exports = mongoose.model(modelName, modelSchema)
}