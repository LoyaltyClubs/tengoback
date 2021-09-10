const cuota = require('../models').Cuota;

const cuotaController = { }

cuotaController.get = (req, res) => {
    return cuota.findAll({ where: { deleted: false } }).
        then(cuota => res.status(200).send(cuota))
        .catch(error => res.status(400).send(error));
}

cuotaController.getCuotasByCredito = (req, res) => {
    const { id } = req.params;
    return cuota.findAll({ where: { credito_id: id, deleted: false } }).
        then(cuota => res.status(200).send(cuota))
        .catch(error => res.status(400).send(error));
}

cuotaController.create = (req, res) => {
    return cuota.create({
        descripcion: req.body.descripcion,
        nro_de_cuota: req.body.nro_de_cuota,
        monto: req.body.monto,
        fecha_limite: req.body.fecha_limite,
        estado: req.body.estado,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(cuota => res.status(200).send(cuota))
        .catch(error => res.status(400).send(error));
}

cuotaController.actualizar = (req, res) => {
    const { id } = req.params;
    return cuota.update({
        descripcion: req.body.descripcion,
        nro_de_cuota: req.body.nro_de_cuota,
        monto: req.body.monto,
        fecha_limite: req.body.fecha_limite,
        estado: req.body.estado,
        updatedAt: new Date()
    },
        {
            where: {
                id: id
            }
        }).then(cuota => res.status(200).send(cuota))
        .catch(error => res.status(400).send(error));
}

cuotaController.eliminar = (req, res) => {
    const { id } = req.params;
    return cuota.update(
        {
            deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(cuota => res.status(200).send(cuota))
        .catch(error => res.status(400).send(error));
}

module.exports = cuotaController;