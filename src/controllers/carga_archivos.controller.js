const { request, response } = require('express')
const cliente = require('../models').Cliente
const empresa = require('../models').Empresa
const { subirArchivo, borrarArchivo } = require('./uploads.controller')
const { obtenerCiudad, obtenerEmpresa } = require('./obtenerCiudadExel')
const XLSX = require('xlsx')

const cargar = {}

cargar.cargarExcel = async (req = request, res = response) => {
    //valida que le documento exista
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }
    const { archivo } = req.files
    const { esCliente } = req.body
    const modeloCliente = []
    try {
        const nombre = await subirArchivo(archivo, ['xlsx'], '');
        const worbook = XLSX.readFile(`src/uploads/${nombre}`);//ruta de donde se obtiene el documento
        const worbookSheets = worbook.SheetNames;
        const dataExcel = XLSX.utils.sheet_to_json(worbook.Sheets[worbookSheets[0]]);



        dataExcel.forEach(async dato => {
            const resp = await empresa.findOne({ where: { nombre: dato.nombre_de_empresa }, attributes: ['id'] })

            modeloCliente.push({
                nombre: dato.nombre,
                apellido_paterno: dato.apellido_paterno,
                apellido_materno: dato.apellido_materno,
                estado_civil: dato.estado_civil,
                fecha_nacimiento: dato.fecha_nacimiento,
                sexo: dato.sexo,
                ci: dato.cedula,
                calle_particular: dato.calle_particular,
                zona: dato.zona,
                provincia: dato.provincia,
                barrio: dato.barrio,
                ciudad_id: obtenerCiudad(dato.ciudad),
                telefono_fijo: dato.telefono,
                telefono_celular: dato.celular,
                email: dato.email,
                nombre_referencia: dato.nombre_de_referencia,
                telefono_referencia: dato.telefono_de_referencia,
                tipo_tel_referencia: dato.tipo_telefono_de_referencia,
                parentesco_referencia: dato.parentesco_de_referencia,
                ciudad_referencia: dato.ciudad_de_referencia,
                dia_pago: dato.dia_de_pago,
                linea_credito: dato.linea_de_credito,
                empresa_id: resp != null || resp != undefined || resp != 0 ? resp.id : console.log(resp)
            })
            // console.log(modeloCliente);
        })
        await console.log(modeloCliente, 'esta aqui');
        return 'termina'
        if (esCliente == 'true') {
            // sacar todos los carnets del archivo excel
            let carnets = [];
            await dataExcel.forEach(dato => {
                carnets.push(dato.ci)
            })
            //busca los clientes por numero de carnet
            const respuesta = await cliente.findAll({
                where: {
                    ci: carnets
                }
            })
            //ecuentra carnet ya registrados
            let carnetsEncontrados = [];
            await respuesta.forEach(customer => {
                carnetsEncontrados.push(customer.ci);
            })
            //carnets que no estan registrdor en la bd
            const carnetsSinRegistrar = await carnets.filter(carnet => {
                return !carnetsEncontrados.includes(carnet.toString())
            })
            //crea un arrglo con los carnets que no esten registrados previamente
            const clientes = await dataExcel.filter(dato => {
                return carnetsSinRegistrar.includes(dato.ci)
            })

            await cliente.bulkCreate(clientes)
            res.status(201).json({
                ok: true,
                msg: "Clientes creados correctamente",
                regAgregados: clientes.length,
                regExistentes: respuesta.length,
                dataExcel

            })
            borrarArchivo(nombre)
        } else {
            let nit = []
            await dataExcel.forEach(dato => {
                nit.push(dato.nit)
            })
            //busca a las empresas por nit
            const respuesta = await empresa.findAll({
                where: {
                    nit: nit
                }
            })
            //ecuentra nits ya registrados
            let nitsEncontrados = [];
            await respuesta.forEach(empresa => {
                nitsEncontrados.push(empresa.nit);
            })
            //nits que no estan registrdor en la bd
            const nitsSinRegistrar = await nit.filter(carnet => {
                return !nitsEncontrados.includes(carnet.toString())
            })
            //crea un arrglo con los nits que no esten registrados previamente
            const empresas = await dataExcel.filter(dato => {
                return nitsSinRegistrar.includes(dato.nit)
            })

            await empresa.bulkCreate(empresas)
            res.status(201).json({
                ok: true,
                msg: "Empresas creados correctamente",
                regAgregados: empresas.length,
                regExistentes: respuesta.length,
                dataExcel

            })


            borrarArchivo(nombre)
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error,
            msg: error.message
        })
    }
}

module.exports = cargar
