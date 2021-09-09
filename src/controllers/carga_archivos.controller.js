const { request, response } = require('express')
const cliente = require('../models').Cliente
const empresa = require('../models').Empresa
const { subirArchivo, borrarArchivo } = require('./uploads.controller')
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
    try {
        const nombre = await subirArchivo(archivo, ['xlsx'], '');
        const worbook = XLSX.readFile(`src/uploads/${nombre}`);//ruta de donde se obtiene el documento
        const worbookSheets = worbook.SheetNames;
        const dataExcel = XLSX.utils.sheet_to_json(worbook.Sheets[worbookSheets[0]]);

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
            //busca los clientes por numero de carnet
            const respuesta = await empresa.findAll({
                where: {
                    nit: nit
                }
            })
            //ecuentra carnet ya registrados
            let nitsEncontrados = [];
            await respuesta.forEach(empresa => {
                nitsEncontrados.push(empresa.nit);
            })
            //carnets que no estan registrdor en la bd
            const nitsSinRegistrar = await nit.filter(carnet => {
                return !nitsEncontrados.includes(carnet.toString())
            })
            //crea un arrglo con los carnets que no esten registrados previamente
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
