const { Router } = require('express')
const router = Router()

const posController = require('../controllers/pos.controller')

router.post('/leerTarjeta', posController.leerTarjeta);

router.post('/financiamiento',posController.finaciamiento);

router.post('/confirmacion', posController.confirmacionFinanciamiento);

router.post('/confirmacionPago', posController.confirmacionPago);

// muestra si la tarjeta esta activa 
router.get('/state/:id', posController.validarTarjeta);

// activa tarjeta (crea nuevo registro en farmacorp) 
router.post('/activate', posController.activarTarjeta);

// marca que la compra se ha realizado con la secuencia de factura y la bodega correspondiente
router.post('/update', posController.actualizarTarjeta);

router.post('/pagoCuota', posController.pagoCuota);

module.exports = router