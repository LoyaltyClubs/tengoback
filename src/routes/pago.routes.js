const { Router } = require('express')
const routerPago = Router()

const pagoController = require('../controllers/pago.controller')

routerPago.get('/', pagoController.get);

routerPago.get('/:ci', pagoController.getByCliente);

routerPago.post('/create', pagoController.create);

routerPago.put('/update/:id', pagoController.actualizar);

routerPago.put('/delete/:id', pagoController.eliminar);

module.exports = routerPago