const empresa = require('../models').Empresa;

const empresaController = {}

empresaController.get = (req, res) => {
    return empresa.findAll({where: {deleted: false}}).
    then(empresa => res.status(200).send(empresa))
    .catch(error => res.status(400).send(error));
}

empresaController.create = (req, res) => {
    return empresa.create({
        nombre: req.body.nombre,
        razon_social: req.body.razon_social,
        rubro_id: req.body.rubro_id,
        direccion: req.body.direccion,
        ciudad_id: req.body.ciudad_id,
        fecha_cierre: req.body.fecha_cierre,
        inicio_contrato: req.body.inicio_contrato,
        fin_contrato: req.body.fin_contrato,
        representante_legal: req.body.representante_legal,
        email: req.body.email,
        cargo: req.body.cargo,
        ci: req.body.ci,
        expedicion: req.body.expedicion,
        telefono: req.body.telefono,
        plan_id: req.body.plan_id,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(empresa => res.status(200).send(empresa))
    .catch(error => res.status(400).send(error));
}

empresaController.actualizar = (req, res) => {
    const { id } = req.params;
    return empresa.update(
        {
            nombre: req.body.nombre,
            razon_social: req.body.razon_social,
            rubro_id: req.body.rubro_id,
            direccion: req.body.direccion,
            ciudad_id: req.body.ciudad_id,
            fecha_cierre: req.body.fecha_cierre,
            inicio_contrato: req.body.inicio_contrato,
            fin_contrato: req.body.fin_contrato,
            representante_legal: req.body.representante_legal,
            email: req.body.email,
            cargo: req.body.cargo,
            ci: req.body.ci,
            expedicion: req.body.expedicion,
            telefono: req.body.telefono,
            plan_id: req.body.plan_id,
            estado: req.body.estado,
            updatedAt: new Date()
        },
        {
            where: {
                id: id
            }
        }).then(empresa => res.status(200).send(empresa))
        .catch(error => res.status(400).send(error));
}

empresaController.eliminar = (req, res) => {
    const { id } = req.params;
    return empresa.update(
        {
        deleted: true,
        updatedAt: new Date()
        },
        {
            where: {
                id: id
            }
        }).then(empresa => res.status(200).send(empresa))
        .catch(error => res.status(400).send(error));
}

module.exports = empresaController;