const credito = require('../models').Credito;
const { Op } = require("sequelize");
const creditoController = { }

creditoController.get = (req, res) => {
    return credito.findAll({ where: { deleted: false } }).
        then(credito => res.status(200).send(credito))
        .catch(error => res.status(400).send(error));
}

creditoController.getByCliente = (req, res) => {
    return credito.findAll({ where: { id: req.params.id, deleted: false, estado: {[Op.not]: "SIN CONFIRMAR"}}}).
        then(credito => res.status(200).send(credito))
        .catch(error => res.status(400).send(error));
}

creditoController.create = (req, res) => {
    return credito.create({
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        estado: req.body.estado,
        nro_cuotas: req.body.nro_cuotas,
        monto_financiado: req.body.monto_financiado,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(credito => res.status(200).send(credito))
        .catch(error => res.status(400).send(error));
}

creditoController.actualizar = (req, res) => {
    const { id } = req.params;
    return credito.update({
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
        }).then(credito => res.status(200).send(credito))
        .catch(error => res.status(400).send(error));
}

creditoController.eliminar = (req, res) => {
    const { id } = req.params;
    return credito.update(
        {
            deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(credito => res.status(200).send(credito))
        .catch(error => res.status(400).send(error));
}

module.exports = creditoController;