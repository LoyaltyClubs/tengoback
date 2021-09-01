const { Router } = require('express')
const routerTipo_tarjeta = Router()

const tipo_tarjetaController = require('../controllers/tipo_tarjeta.controller')

routerTipo_tarjeta.get('/', tipo_tarjetaController.get);

routerTipo_tarjeta.post('/create', tipo_tarjetaController.create);

routerTipo_tarjeta.put('/update/:id', tipo_tarjetaController.actualizar);

routerTipo_tarjeta.put('/delete/:id', tipo_tarjetaController.eliminar);

module.exports = routerTipo_tarjeta