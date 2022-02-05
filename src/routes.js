const express = require ('express');
const router = express.Router();

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');


const Auth = require('./middlewares/Auth')

const AuthValidator = require('./validators/AuthValidator');
const UserValidator = require('./validators/UserValidator');

//ROTA TESTE
router.get('/ping', (req, res) => {
  res.json({
    pong: true
  });
});

//ROTAS DE ESTADO
router.get('/states', UserController.getStates);


//ROTAS DE LOGIN
router.post('/user/signin',AuthValidator.signin, AuthController.signin); //login
router.post('/user/signup', AuthValidator.signup, AuthController.signup); //cadastro


//ROTAS DE USUARIO
router.get('/user/me', Auth.private, UserController.info); //info do usuario
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction); //editar info do usuario

//ROTAS DE CATEGORIA
router.get('/categories', AdsController.getCategories); //listar categorias


//ROTAS DE ANUNCIO
router.post('ad/add',  Auth.private, AdsController.addAction); //cadastrar anuncio
router.get('/ad/list', AdsController.getList); //listar anuncios
router.get('/ad/item', AdsController.getItem); //listar anuncio especifico,
router.post('/ad/:id', Auth.private, AdsController.editAction); //editar anuncio


module.exports = router;
