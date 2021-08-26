const { Router } = require('express')
const routerRubro = Router()

const rubroController = require('../controllers/rubro.controller')

routerRubro.get('/', rubroController.get);

routerRubro.post('/create',rubroController.create);

routerRubro.put('/update/:id', rubroController.actualizar);

routerRubro.put('/delete/:id', rubroController.eliminar);

module.exports = routerRubro