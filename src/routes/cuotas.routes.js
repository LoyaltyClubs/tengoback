const { Router } = require('express')
const routerCuotas = Router()

const cuotasController = require('../controllers/cuotas.controller')

routerCuotas.get('/', cuotasController.get);

routerCuotas.post('/create', cuotasController.create);

routerCuotas.put('/update/:id', cuotasController.actualizar);

routerCuotas.put('/delete/:id', cuotasController.eliminar);

module.exports = routerCuotas