const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const modelSchema = new mongoose.Schema({
    name: String,
    slug:String
});

const modelName = 'Category';

if(mongoose.connection && mongoose.connection.models[modelName]){ //se já existe o model
  module.exports = mongoose.connection.models[modelName]; //retorna o model
}else{
  module.exports = mongoose.model(modelName, modelSchema) //cria o model
}