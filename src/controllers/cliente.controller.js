const cliente = require('../models').Cliente

const clienteController = { }


clienteController.get = (req, res) => {
    return cliente.findAll(
        //{ where: { deleted: false } }
    ).
        then(cliente => res.status(200).send(cliente))
        .catch(error => res.status(400).send(error));
}

clienteController.create = (req, res) => {
    return cliente.create({

        nombre: 'admin',
        apellido_paterno: 'admin',
        apellido_materno: 'admin',
        estado_civil: 'admin',
        fecha_nacimiento: new Date(),
        sexo: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
        // nombre: req.body.nombre,
        // apellido_paterno: req.body.apellido_paterno,
        // apellido_materno: req.body.apellido_materno,
        // estado_civil: req.body.estado_civil,
        // fecha_nacimiento: req.body.fecha_nacimiento,
        // sexo: req.body.sexo,
    }).then(cliente => res.status(200).send(cliente))
        .catch(error => {
            console.log(error);
            res.status(400).json({
                ok: false
            })
        });
}

clienteController.update = (req, res) => {
    const { id } = req.params;
    return cliente.update(
        {
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            estado_civil: req.body.estado_civil,
            fecha_nacimineto: req.body.fecha_nacimineto,
            sexo: req.body.sexo,
            updatedAt: new Date()
        },
        {
            where: {
                id: id
            }
        }).then(cliente => res.status(200).send(cliente))
        .catch(error => res.status(400).send(error));
}

clienteController.delete = (req, res) => {
    const { id } = req.params;
    return cliente.update(
        {
            deleted: true
        },
        {
            where: {
                id: id
            }
        }).then(cliente => res.status(200).send(cliente))
        .catch(error => res.status(400).send(error));
}

module.exports = clienteController