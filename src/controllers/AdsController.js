const Category = require('../models/Category')
module.exports = {
  getCategories:async (req,res) => {
    let categories = await Category.find()//busca todas as categorias

    let categoryList = [] //cria um array para armazenar as categorias
     
    for(let i in categories){
      categoryList.push({
        ...categories[i]._doc,
        img:`${(process.env.BASE)}/assets/images/${categories[i].slug}.png`
      })//percorre o array de categorias
    }

    res.json({categoryList})

  },
  addAction:async (req,res) => {

  },
  getList:async (req,res) => {

  },
  getItem:async (req,res) => {
    
  },
  editAction:async (req,res) => {
    
  }

}