const tipo_tarjeta = require('../models').Tipo_tarjeta;

const tipo_tarjetaController = { }

tipo_tarjetaController.get = (req, res) => {
    return tipo_tarjeta.findAll({ where: { deleted: false } }).
        then(tipo_tarjeta => res.status(200).send(tipo_tarjeta))
        .catch(error => res.status(400).send(error));
}

tipo_tarjetaController.create = (req, res) => {
    return tipo_tarjeta.create({
        nombre: req.body.nombre,
        estado: req.body.estado,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(tipo_tarjeta => res.status(200).send(tipo_tarjeta))
        .catch(error => res.status(400).send(error));
}

tipo_tarjetaController.actualizar = (req, res) => {
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

tipo_tarjetaController.eliminar = (req, res) => {
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

module.exports = tipo_tarjetaController;