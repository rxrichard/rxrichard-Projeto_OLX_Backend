const User = require('../models/User');
module.exports ={
  private: async (req,res,next) => {

    if(!req.body.token && !req.query.token){ //se não tiver token
      res.json({erro:'Token não informado'}); 
      return
    }
    let token = ''; //token

    //verifica se o token veio no body
    if(req.body.token){
      token = req.body.token;
    }
    //verifica se o token veio no query
    if(req.query.token){
      token = req.query.token;
    }


    if(token == ''){
      res.json({erro:'Token não informado'});
      return
    }
      //verifica se o token é valido
    const user = await User.findOne({token})

    if(!user){
      res.json({erro:'Token não informado'});
      return
    }
   
    next()
  }
}