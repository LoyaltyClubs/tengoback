const cuota_mensual = require('../models').CuotaMensual;

const cuota_mensualController = { }

cuota_mensualController.get = (req, res) => {
    return cuota_mensual.findAll({}).
        then(cuota_mensual => res.status(200).send(cuota_mensual))
        .catch(error => res.status(400).send(error));
}

cuota_mensualController.getByCliente = (req, res) => {
    return cuota_mensual.findAll({ where: { cliente_id: req.params.cliente_id}}).
        then(cuota_mensual => res.status(200).send(cuota_mensual))
        .catch(error => res.status(400).send(error));
}

cuota_mensualController.create = (req, res) => {
    return tipo_tarjeta.create({
        nombre: req.body.nombre,
        estado: req.body.estado,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(tipo_tarjeta => res.status(200).send(tipo_tarjeta))
        .catch(error => res.status(400).send(error));
}

cuota_mensualController.actualizar = (req, res) => {
    const { id } = req.params;
    return tipo_tarjeta.update({
        nombre: req.body.nombre,
        estado: req.body.estado,
        updatedAt: new Date()
    },
        {
            where: {
                id: id
            }
        }).then(tipo_tarjeta => res.status(200).send(tipo_tarjeta))
        .catch(error => res.status(400).send(error));
}

cuota_mensualController.eliminar = (req, res) => {
    const { id } = req.params;
    return tipo_tarjeta.update(
        {
            deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(tipo_tarjeta => res.status(200).send(tipo_tarjeta))
        .catch(error => res.status(400).send(error));
}

module.exports = cuota_mensualController;