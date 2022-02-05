const { validationResult, matchedData } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const State = require("../models/State");

module.exports = {
  signin: async (req, res) => {

    const errors = validationResult(req); //pega os erros de validação
    if (!errors.isEmpty()) {
      //se tiver erros
      res.json({ error: errors.mapped() }); //retorna os erros
      return; //para a execução
    }
    const data = matchedData(req); //pega os dados que passaram na validação

    const user = await User.findOne({ email: data.email }); //busca o usuario no banco

    //verifica se o usuario existe
    if (!user) {//se não encontrar o usuario
      res.json({ error: "Usuário e/ou senha incorretos" }); //retorna erro
      return;
    } 

    //validação de senha
    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash); //verifica se a senha está correta

    if (!isPasswordValid) { //se não estiver correta
      res.json({ error: "Usuário e/ou senha incorretos" }); //retorna erro
      return;
    }

    //se tudo estiver correto
    
    const payload = (Date.now() + Math.random()).toString(); //gera o token
    const token = await bcrypt.hash(payload, 10); //criptografa o token

    user.token = token; //atualiza o token no usuario
    await user.save(); //salva o usuario

    res.json({ token, email: data.email }); //retorna o token e o email


  },

  //CADASTRO
  signup: async (req, res) => {
    const errors = validationResult(req); //pega os erros de validação
    if (!errors.isEmpty()) {
      //se tiver erros
      res.json({ error: errors.mapped() }); //retorna os erros
      return; //para a execução
    }
    const data = matchedData(req); //pega os dados que passaram na validação

    //Verifica se o email já existe
    const user = await User.findOne({
      email: data.email,
    });
    if (user) {
      res.json({
        error: { email: { msg: "Email já cadastrado" } }, //retorna erro
      });
      return;
    }

    //Verifica se o estado já existe
    if (mongoose.Types.ObjectId.isValid(data.state)) {
      //se o id do estado é valido
      const stateItem = await State.findById(data.state); //busca o estado

      if (!stateItem) {
        //se não encontrar o estado
        res.json({
          error: { state: { msg: "Estado não existe" } }, //retorna erro
        });
        return;
      }
    } else {
      //se o id do estado não é valido
      res.json({
        error: { state: { msg: "Código de estado invalido" } }, //retorna erro
      });
      return;
    }

    //CRIAÇÃO DO USUARIO

    
    const passwordHash = await bcrypt.hash(data.password, 10); //criptografa a senha

    const payload = (Date.now() + Math.random()).toString(); //gera o token
    const token = await bcrypt.hash(payload, 10); //criptografa o token

    //Cria o usuario no banco
    const newUser = new User ({ 
      name: data.name,
      email: data.email,
      passwordHash,
      token,
      state: data.state      
    })
    await newUser.save()

    res.json({token})//retorna os dados
  },
};
