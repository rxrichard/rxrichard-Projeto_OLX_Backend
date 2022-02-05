const State = require('../models/State')
const User = require('../models/User')
const Category = require('../models/Category')
const Ad = require('../models/Ad')

const { validationResult, matchedData } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports ={
  //PEGA ESTADOS
  getStates: async(req,res)=>{
    let states = await State.find()//busca todos os estados
    res.json({states})
  },

  //PEGA TODOS OS DADOS DO USUARIO
  info:async (req,res) => {

    let token = req.query.token //pega o token
    const user = await User.findOne({token}) //busca o usuario

    const state = await State.findById(user.state) //busca o estado do usuario

    const ads = await Ad.find({idUser: user._id.toString()}) //pega os anúncios do usuario


    let adList = [] //cria um array para armazenar os anúncios

    for(let i in ads){
      const categ = await Category.findById(ads[i].idCategory) //busca a categoria do anúncio
      adList.push({...ads[i], category: categ.slug})//percorre o array de anúncios

      /*percorre o array de anúncios
      adList.push({
        id: ads[i]._id, //id do anúncio 
        status: ads[i].status, //status do anúncio
        images: ads[i].images, //imagens do anúncio
        dateCreated: ads[i].dateCreated, //data de criação do anúncio
        title: ads[i].title, //título do anúncio
        price: ads[i].price, //preço do anúncio
        priceNegociable: ads[i].priceNegociable, //preço negociável sim ou não
        description: ads[i].description, //descrição do anúncio
        views: ads[i].views, //visualizações do anúncio
        category: categ.slug //categoria do anúncio
      })*/

    }

    res.json({
      name: user.name, //nome do usuário
      email: user.email, //email do usuario
      state: state.name, //nome do estado
      ads: adList //anúncios do usuário
    })
    
    
  },
  
  editAction:async (req,res) => {
    const errors = validationResult(req); //pega os erros de validação
    if (!errors.isEmpty()) {
      //se tiver erros
      res.json({ error: errors.mapped() }); //retorna os erros
      return; //para a execução
    }
    const data = matchedData(req); //pega os dados que passaram na validação



    let updates = {}
    
    
    //ATUALIZA NOME
    if(data.name){
      updates.name = data.name
    }
    //ATUALIZA EMAIL
    if(data.email){
      //verifica se o email já existe
      const emailCheck = await User.findOne({email: data.email})
      if(emailCheck){
        return res.json( {error: 'Email já cadastrado'})
      }
      updates.email = data.email
    }

    //ATUALIZA ESTADO
    if(data.state){
      if (mongoose.Types.ObjectId.isValid(data.state)) {
        const stateCheck = await State.findById(data.state)
        if(!stateCheck){
          return res.json({error: 'Estado não encontrado'})
        }
        updates.state = data.state
      }else{
        return res.json({error: 'Código do estado inválido'})	
      }
    }

    //ATUALIZA SENHA
    if(data.password){
      updates.passwordHash = await bcrypt.hash(data.password, 10)
    }


    await User.findOneAndUpdate({token: data.token}, {$set: updates})
    res.json({success: 'Dados atualizados com sucesso'})
    
  }


}