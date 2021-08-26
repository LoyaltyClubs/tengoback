const { Router } = require('express')
const routerPlan = Router()

const planController = require('../controllers/plan.controller')

routerPlan.get('/', planController.get);

routerPlan.post('/create',planController.create);

routerPlan.put('/update/:id', planController.actualizar);

routerPlan.put('/delete/:id', planController.eliminar);

module.exports = routerPlan