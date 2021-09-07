const cliente = require('../models').Cliente
const { request, response } = require('express')
const { subirArchivo } = require('./uploads.controller')
const XLSX = require('xlsx')


const cargar = {}

cargar.cargarExcel = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }
    const { archivo } = req.files
    try {
        const nombre = await subirArchivo(archivo, ['xlsx'], '');
        const worbook = XLSX.readFile(`src/uploads/${nombre}`);
        const worbookSheets = worbook.SheetNames;
        const dataExcel = XLSX.utils.sheet_to_json(worbook.Sheets[worbookSheets[0]]);
        let carnets = [];
        await dataExcel.forEach(dato => { // sacar todos los carnets del archivo excel
            carnets.push(dato.ci)
        })

        const respuesta = await cliente.findAll({
            where: {
                ci: carnets
            }
        })

        let carnetsEncontrados = [];

        await respuesta.forEach(customer => {
            carnetsEncontrados.push(customer.ci);
        })
        const carnetsSinRegistrar = await carnets.filter(carnet => { //carnets que no estan registrdor en la bd
            return !carnetsEncontrados.includes(carnet.toString())
        })

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

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error,
            msg: error.message
        })
    }
}

module.exports = cargar
