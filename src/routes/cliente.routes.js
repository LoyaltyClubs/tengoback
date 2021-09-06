const { Router } = require('express')
const routeCliente = Router()

const clienteController = require('../controllers/cliente.controller')

routeCliente.get('/', clienteController.get)
routeCliente.get('/:ci', clienteController.getByCI)
routeCliente.post('/create', clienteController.create)
routeCliente.put('/update/:id', clienteController.update)
routeCliente.put('/delete/:id', clienteController.delete)
routeCliente.put('/bloquear/:id', clienteController.bloquear)

module.exports = routeCliente