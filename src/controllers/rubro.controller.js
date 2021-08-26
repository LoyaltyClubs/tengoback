const rubro = require('../models').Rubro;

const rubroController = {}

rubroController.get = (req, res) => {
    return rubro.findAll({where: {deleted: false}}).
    then(rubro => res.status(200).send(rubro))
    .catch(error => res.status(400).send(error));
}

rubroController.create = (req, res) => {
    return rubro.create({
        nombre: req.body.nombre,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(rubro => res.status(200).send(rubro))
    .catch(error => res.status(400).send(error));
}

rubroController.actualizar = (req, res) => {
    const { id } = req.params;
    return rubro.update(
        {
        nombre: req.body.nombre,
        estado: req.body.estado,
        updatedAt: new Date()
        },
        {
            where: {
                id: id
            }
        }).then(rubro => res.status(200).send(rubro))
        .catch(error => res.status(400).send(error));
}

rubroController.eliminar = (req, res) => {
    const { id } = req.params;
    return rubro.update(
        {
        deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(rubro => res.status(200).send(rubro))
        .catch(error => res.status(400).send(error));
}

module.exports = rubroController;