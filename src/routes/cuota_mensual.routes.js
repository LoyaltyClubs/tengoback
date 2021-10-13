const { Router } = require('express')
const routerCuota_Mensual = Router()

const cuota_mensualController = require('../controllers/cuota_mensual.controller')

routerCuota_Mensual.get('/', cuota_mensualController.get);

routerCuota_Mensual.post('/create', cuota_mensualController.create);

routerCuota_Mensual.put('/update/:id', cuota_mensualController.actualizar);

routerCuota_Mensual.put('/delete/:id', cuota_mensualController.eliminar);

module.exports = routerCuota_Mensual