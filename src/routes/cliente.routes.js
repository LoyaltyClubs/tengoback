const { Router } = require('express')
const routeCliente = Router()

const clienteController = require('../controllers/cliente.controller')

routeCliente.get('/', clienteController.get)
routeCliente.post('/create', clienteController.create)
routeCliente.put('/update/:id', clienteController.update)
routeCliente.put('/delete/:id', clienteController.delete)

module.exports = routeCliente