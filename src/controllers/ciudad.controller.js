const provincia = require('../models/provincia');

const ciudad = require('../models').Ciudad;

const ciudadController = {}

ciudadController.get = (req, res) => {
    return ciudad.findAll({where: {deleted: false}, include:['Provincia']}).
    then(ciudad => res.status(200).send(ciudad))
    .catch(error => res.status(400).send(error));
}

ciudadController.create = (req, res) => {
    return ciudad.create({
        nombre: req.body.nombre,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(ciudad => res.status(200).send(ciudad))
    .catch(error => res.status(400).send(error));
}

ciudadController.actualizar = (req, res) => {
    const { id } = req.params;
    return ciudad.update(
        {
        nombre: req.body.nombre,
        estado: req.body.estado,
        updatedAt: new Date()
        },
        {
            where: {
                id: id
            }
        }).then(ciudad => res.status(200).send(ciudad))
        .catch(error => res.status(400).send(error));
}

ciudadController.eliminar = (req, res) => {
    const { id } = req.params;
    return ciudad.update(
        {
        deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(ciudad => res.status(200).send(ciudad))
        .catch(error => res.status(400).send(error));
}

module.exports = ciudadController;