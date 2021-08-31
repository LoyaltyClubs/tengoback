const { Router } = require('express')
const routeCliente = Router()

const clienteController = require('../controllers/cliente.controller')

routeCliente.get('/', clienteController.get)
routeCliente.get('/create', clienteController.create)
routeCliente.get('/update/:id', clienteController.update)
routeCliente.get('/delete/:id', clienteController.delete)

module.exports = routeCliente