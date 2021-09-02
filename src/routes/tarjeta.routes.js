const { Router } = require('express')
const routerTarjeta = Router()

const tarjetaController = require('../controllers/tarjeta.controller')

routerTarjeta.get('/', tarjetaController.get);

routerTarjeta.post('/create', tarjetaController.create);

routerTarjeta.put('/update/:id', tarjetaController.actualizar);

routerTarjeta.put('/delete/:id', tarjetaController.eliminar);

module.exports = routerTarjeta