const { Router } = require('express')
const routerCredito = Router()

const creditoController = require('../controllers/credito.controller')

routerCredito.get('/', creditoController.get);

routerCredito.get('/:id', creditoController.getByCliente);

routerCredito.post('/create', creditoController.create);

routerCredito.put('/update/:id', creditoController.actualizar);

routerCredito.put('/delete/:id', creditoController.eliminar);

module.exports = routerCredito