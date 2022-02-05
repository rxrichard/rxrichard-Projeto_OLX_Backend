const {checkSchema} = require('express-validator')
module.exports ={
  editAction: checkSchema({ //validação de dados
    token:{
      notEmpty:true, //verifica se não está vazio
    },
    name:{ 
      optional:true, //se não for preenchido, não é obrigatório
      trim:true, //remove espaços antes e depois
      isLength:{ //verifica se tem o tamanho de caracteres
        options:{min:3}
      },
      errorMessage:'O nome deve ter no mínimo 3 caracteres'
    },
    email:{
      optional:true, //se não for preenchido, não é obrigatório
      isEmail:true,
      normalizeEmail:true, //ajusta email para minusculo parao banco de dados
      errorMessage:'Email inválido'
    },
    password:{
      optional:true, //se não for preenchido, não é obrigatório
      isLength:{
        options:{min:6}
      },
      errorMessage:'A senha deve ter no mínimo 6 caracteres'
    },
    state:{
      optional:true, //se não for preenchido, não é obrigatório
      notEmpty:true, //verifica se não está vazio
      errorMessage:'Selecione um estado'
    }
  })
}