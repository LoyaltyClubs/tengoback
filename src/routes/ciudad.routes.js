const { Router } = require('express')
const routerCiudad = Router()

const ciudadController = require('../controllers/ciudad.controller')

routerCiudad.get('/', ciudadController.get);

routerCiudad.post('/create',ciudadController.create);

routerCiudad.put('/update/:id', ciudadController.actualizar);

routerCiudad.put('/delete/:id', ciudadController.eliminar);

module.exports = routerCiudad