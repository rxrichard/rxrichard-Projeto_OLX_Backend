require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const apiRoutes = require('./src/routes');


//conexao com o banco de dados
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
   // useFindAndModify: false,
    useUnifiedTopology: true
})

mongoose.Promise = global.Promise;
//caso de erro na conexao
mongoose.connection.on('error', (err) => {
    console.log("Erro: " + err.message);
})


//crindo o servidor
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'/public'))

server.use('/',apiRoutes)

server.listen(process.env.PORT,()=>{
  console.log(`Servidor rodando na porta: http://localhost:${process.env.PORT}`)
})

