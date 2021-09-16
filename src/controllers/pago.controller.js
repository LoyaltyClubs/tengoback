const pago = require('../models').Pago;
const pagoController = { }

pagoController.get = (req, res) => {
    return pago.findAll({ where: { deleted: false } }).
        then(pago => res.status(200).send(pago))
        .catch(error => res.status(400).send(error));
}

pagoController.getByCliente = (req, res) => {
    return pago.findAll({ where: { ci_cliente: req.params.ci}}).
        then(pago => res.status(200).send(pago))
        .catch(error => res.status(400).send(error));
}

pagoController.create = (req, res) => {
    return pago.create({
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        estado: req.body.estado,
        nro_cuotas: req.body.nro_cuotas,
        monto_financiado: req.body.monto_financiado,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(pago => res.status(200).send(pago))
        .catch(error => res.status(400).send(error));
}

pagoController.actualizar = (req, res) => {
    const { id } = req.params;
    return pago.update({
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        estado: req.body.estado,
        nro_cuotas: req.body.nro_cuotas,
        monto_financiado: req.body.monto_financiado,
        updatedAt: new Date()
    },
        {
            where: {
                id: id
            }
        }).then(pago => res.status(200).send(pago))
        .catch(error => res.status(400).send(error));
}

pagoController.eliminar = (req, res) => {
    const { id } = req.params;
    return pago.update(
        {
            deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(pago => res.status(200).send(pago))
        .catch(error => res.status(400).send(error));
}

module.exports = pagoController;