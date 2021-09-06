const cliente = require('../models').Cliente

const clienteController = { }


clienteController.get = (req, res) => {
    return cliente.findAll(
        { where: { deleted: false } }
    ).
        then(cliente => res.status(200).send(cliente))
        .catch(error => res.status(400).send(error));
}

clienteController.getByCI = (req, res) => {
    return cliente.findAll(
        { where: { ci: req.params.ci } }
    ).
        then(cliente => res.status(200).send(cliente))
        .catch(error => res.status(400).send(error));
}

clienteController.create = async (req, res) => {
    console.log(req.body);
    return await cliente.create({
        nombre: req.body.nombre,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        estado_civil: req.body.estado_civil,
        fecha_nacimiento: req.body.fecha_nacimiento,
        sexo: req.body.sexo,
        ci: req.body.ci,
        calle_particular: req.body.calle_particular,
        zona: req.body.zona,
        provincia: req.body.provincia,
        barrio: req.body.barrio,
        ciudad_id: req.body.ciudad_id,
        telefono_fijo: req.body.telefono_fijo,
        telefono_celular: req.body.telefono_celular,
        email: req.body.email,
        nombre_referencia: req.body.nombre_referencia,
        provincia_referencia: req.body.provincia_referencia,
        telefono_referencia: req.body.telefono_referencia,
        tipo_tel_referencia: req.body.tipo_tel_referencia,
        ciudad_referencia: req.body.ciudad_referencia,
        dia_pago: req.body.dia_pago,
        linea_credito: req.body.linea_credito,
        estado: req.body.estado,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(cliente => res.status(200).send(cliente))
        .catch(error => {
            console.log(error);
            console.log(req.body);
            res.status(400).json({
                ok: false
            })
        });
    console.log(req.body);
}

clienteController.update = (req, res) => {
    const { id } = req.params;
    return cliente.update(
        {
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            estado_civil: req.body.estado_civil,
            fecha_nacimiento: req.body.fecha_nacimiento,
            sexo: req.body.sexo,
            ci: req.body.ci,
            calle_particular: req.body.calle_particular,
            zona: req.body.zona,
            provincia: req.body.provincia,
            barrio: req.body.barrio,
            ciudad_id: req.body.ciudad_id,
            telefono_fijo: req.body.telefono_fijo,
            telefono_celular: req.body.telefono_celular,
            email: req.body.email,
            nombre_referencia: req.body.nombre_referencia,
            provincia_referencia: req.body.provincia_referencia,
            telefono_referencia: req.body.telefono_referencia,
            tipo_tel_referencia: req.body.tipo_tel_referencia,
            parentesco_referencia: req.body.parentesco_referencia,
            ciudad_referencia: req.body.ciudad_referencia,
            dia_pago: req.body.dia_pago,
            linea_credito: req.body.linea_credito,
            estado: req.body.estado,
            deleted: req.body.deleted,
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

clienteController.bloquear = async (req, res) => {
    const { id } = req.params;
    cli = await cliente.finOne(
        { where: { id: id } });
    var estado = cli.estado=="BLOQUEADO"?"ACTIVO":"BLOQUEADO";
    
    return cliente.update(
        {
            estado: estado
        },
        {
            where: {
                id: id
            }
        }).then(cliente => res.status(200).send(cliente))
        .catch(error => res.status(400).send(error));
}


module.exports = clienteController