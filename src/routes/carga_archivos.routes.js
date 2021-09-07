const { Router } = require('express')
const routerCargar_exel = Router()

const cargar = require('../controllers/carga_archivos.controller')

routerCargar_exel.post('/uploads', cargar.cargarExcel);



module.exports = routerCargar_exel