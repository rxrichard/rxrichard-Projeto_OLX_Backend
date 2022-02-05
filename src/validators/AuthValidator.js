const {checkSchema} = require('express-validator')
module.exports ={
  signup: checkSchema({ //validação de dados
    name:{ 
      trim:true, //remove espaços antes e depois
      isLength:{ //verifica se tem o tamanho de caracteres
        options:{min:3}
      },
      errorMessage:'O nome deve ter no mínimo 3 caracteres'
    },
    email:{
      isEmail:true,
      normalizeEmail:true, //ajusta email para minusculo parao banco de dados
      errorMessage:'Email inválido'
    },
    password:{
      isLength:{
        options:{min:6}
      },
      errorMessage:'A senha deve ter no mínimo 6 caracteres'
    },
    state:{
      notEmpty:true, //verifica se não está vazio
      errorMessage:'Selecione um estado'
    }
  }),

  signin: checkSchema({
    email:{
      isEmail:true,
      normalizeEmail:true, //ajusta email para minusculo parao banco de dados
      errorMessage:'Email inválido'
    },
    password:{
      isLength:{
        options:{min:6}
      },
      errorMessage:'A senha deve ter no mínimo 6 caracteres'
    }
  })
}