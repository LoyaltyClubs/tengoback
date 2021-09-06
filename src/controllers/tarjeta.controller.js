const tarjeta = require('../models').Tarjeta;

const TarjetaController = { }

TarjetaController.get = (req, res) => {
    return tarjeta.findAll({ where: { deleted: false } }).
        then(tarjeta => res.status(200).send(tarjeta))
        .catch(error => res.status(400).send(error));
}

TarjetaController.getByClient = (req, res) => {
    return tarjeta.findAll({ where: { cliente_id: req.params.cliente_id, deleted: false } }).
        then(tarjeta => res.status(200).send(tarjeta))
        .catch(error => res.status(400).send(error));
}

TarjetaController.create = (req, res) => {
    return tarjeta.create({
        numero: req.body.numero,
        fecha_vencimiento: req.body.fecha_vencimiento,
        estado: req.body.estado,
        cliente_id: req.body.cliente_id,
        tipo_id: req.body.tipo_id,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(tarjeta => res.status(200).send(tarjeta))
        .catch(error => res.status(400).send(error));
}

TarjetaController.actualizar = (req, res) => {
    const { id } = req.params;
    return tarjeta.update({
        numero: req.body.numero,
        fecha_vencimiento: req.body.fecha_vencimiento,
        estado: req.body.estado,
        cliente_id: req.body.cliente_id,
        tipo_id: req.body.tipo_id,
        deleted: false,
        updatedAt: new Date()
    },
        {
            where: {
                id: id
            }
        }).then(tarjeta => res.status(200).send(tarjeta))
        .catch(error => res.status(400).send(error));
}

TarjetaController.eliminar = (req, res) => {
    const { id } = req.params;
    return tarjeta.update(
        {
            deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(tarjeta => res.status(200).send(tarjeta))
        .catch(error => res.status(400).send(error));
}

module.exports = TarjetaController;