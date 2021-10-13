const settings = require('../models').settings;

const settingsController = {}

settingsController.get = (req, res) => {
    return settings.findAll({}).
    then(settings => res.status(200).send(settings))
    .catch(error => res.status(400).send(error));
}

settingsController.create = (req, res) => {
    return settings.create({
        monto_vencimiento: req.body.monto_vencimiento,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(settings => res.status(200).send(settings))
    .catch(error => res.status(400).send(error));
}

settingsController.actualizar = (req, res) => {
    const { id } = req.params;
    return settings.update(
        {
        monto_vencimiento: req.body.monto_vencimiento,
        updatedAt: new Date()
        },
        {
            where: {
                id: id
            }
        }).then(settings => res.status(200).send(settings))
        .catch(error => res.status(400).send(error));
}

module.exports = settingsController;