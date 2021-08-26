const { Router } = require('express')
const routerEmpresa = Router()

const empresaController = require('../controllers/empresa.controller')

routerEmpresa.get('/', empresaController.get);

routerEmpresa.post('/create',empresaController.create);

routerEmpresa.put('/update/:id', empresaController.actualizar);

routerEmpresa.put('/delete/:id', empresaController.eliminar);

module.exports = routerEmpresa