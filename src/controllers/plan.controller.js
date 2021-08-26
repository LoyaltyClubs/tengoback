const plan = require('../models').Plan;

const planController = {}

planController.get = (req, res) => {
    return plan.findAll({where: {deleted: false}}).
    then(plan => res.status(200).send(plan))
    .catch(error => res.status(400).send(error));
}

planController.create = (req, res) => {
    return plan.create({
        nombre: req.body.nombre,
        seguro: req.body.seguro,
        mantenimiento: req.body.mantenimiento,
        recargo: req.body.recargo,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(plan => res.status(200).send(plan))
    .catch(error => res.status(400).send(error));
}

planController.actualizar = (req, res) => {
    const { id } = req.params;
    return plan.update({
            nombre: req.body.nombre,
            seguro: req.body.seguro,
            mantenimiento: req.body.mantenimiento,
            recargo: req.body.recargo,
            estado: req.body.estado,
            updatedAt: new Date()
        },
        {
            where: {
                id: id
            }
        }).then(plan => res.status(200).send(plan))
        .catch(error => res.status(400).send(error));
}

planController.eliminar = (req, res) => {
    const { id } = req.params;
    return plan.update(
        {
        deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(plan => res.status(200).send(plan))
        .catch(error => res.status(400).send(error));
}

module.exports = planController;