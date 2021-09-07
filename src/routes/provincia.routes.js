const { Router } = require('express')
const routerProvincia = Router()

const provinciaController = require('../controllers/provincia.controller')

routerProvincia.get('/', provinciaController.get);

routerProvincia.get('/:id', provinciaController.getByCiudad);

routerProvincia.post('/create',provinciaController.create);

routerProvincia.put('/update/:id', provinciaController.actualizar);

routerProvincia.put('/delete/:id', provinciaController.eliminar);

module.exports = routerProvincia