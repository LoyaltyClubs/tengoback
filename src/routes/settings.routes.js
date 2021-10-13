const { Router } = require('express')
const routerSettings = Router()

const settingsController = require('../controllers/settings.controller')

routerSettings.get('/', settingsController.get);

routerSettings.post('/create', settingsController.create);

routerSettings.put('/update/:id', settingsController.actualizar);

module.exports = routerSettings