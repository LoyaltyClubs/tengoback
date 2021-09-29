const provincia = require('../models').Provincia;

const provinciaController = {}

provinciaController.get = (req, res) => {
    return provincia.findAll({where: {deleted: false}}).
    then(provincia => res.status(200).send(provincia))
    .catch(error => res.status(400).send(error));
}

provinciaController.getByCiudad = (req, res) => {
    const { id } = req.params;
    return provincia.findAll({where: {id: id, deleted: false}}).
    then(provincia => res.status(200).send(provincia))
    .catch(error => res.status(400).send(error));
}

provinciaController.create = (req, res) => {
    return provincia.create({
        nombre: req.body.nombre,
        ciudad_id: req.body.ciudad_id,
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(provincia => res.status(200).send(provincia))
    .catch(error => res.status(400).send(error));
}

provinciaController.actualizar = (req, res) => {
    const { id } = req.params;
    return provincia.update(
        {
        nombre: req.body.nombre,
        estado: req.body.estado,
        ciudad_id: req.body.ciudad_id,
        updatedAt: new Date()
        },
        {
            where: {
                id: id
            }
        }).then(provincia => res.status(200).send(provincia))
        .catch(error => res.status(400).send(error));
}

provinciaController.eliminar = (req, res) => {
    const { id } = req.params;
    return provincia.update(
        {
        deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(provincia => res.status(200).send(provincia))
        .catch(error => res.status(400).send(error));
}

module.exports = provinciaController;