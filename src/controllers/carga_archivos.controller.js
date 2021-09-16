const { request, response } = require('express')
const cliente = require('../models').Cliente
const empresa = require('../models').Empresa
const { subirArchivo, borrarArchivo } = require('./uploads.controller')
const { obtenerCiudad, obtenerRubro, obtenerPlan } = require('./obtenerCiudadExel')
const XLSX = require('xlsx')

const cargar = {}

cargar.cargarExcel = async (req = request, res = response) => {
    //valida que le documento exista
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }
    const { archivo } = req.files
    //mandar 'true'esCliente para registrar exel de clientes
    const { esCliente } = req.body
    const modeloCliente = []
    const modeloEmpresa = []
    try {
        const nombre = await subirArchivo(archivo, ['xlsx'], '');
        const worbook = XLSX.readFile(`src/uploads/${nombre}`);//ruta de donde se obtiene el documento
        const worbookSheets = worbook.SheetNames;
        const dataExcel = XLSX.utils.sheet_to_json(worbook.Sheets[worbookSheets[0]]);

        if (esCliente == 'true') {
            let empresaId = 0
            const resp = await empresa.findAll()

            dataExcel.forEach(dato => {
                resp.forEach(empresa => {
                    return empresaId = dato.nombre_de_empresa.replace(empresa.nombre, empresa.id)
                })
                console.log(empresaId);
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
                    empresa_id: isNaN(empresaId) ? null : empresaId
                })
            })
            let carnets = [];
            // sacar todos los carnets de la base de datos
            const respuesta = await cliente.findAll()
            await respuesta.forEach(cliente => {
                carnets.push(cliente.ci)
            })
            const nuevo = modeloCliente.filter(cliente => !carnets.includes(cliente.ci))
            console.log(nuevo, 'es el nuevo');
            const clientes = nuevo

            await cliente.bulkCreate(clientes)
            borrarArchivo(nombre)
            return res.status(201).json({
                ok: true,
                msg: "Clientes creados correctamente: " + clientes.length,
                regAgregados: clientes.length,
                regTotalExistentes: respuesta.length,
                clientes

            })
        } else {

            dataExcel.forEach(dato => {
                modeloEmpresa.push({
                    nombre: dato.nombre,
                    razon_social: dato.razon_social,
                    nit: dato.nit,
                    rubro_id: obtenerRubro(dato.rubro),
                    direccion: dato.direccion,
                    ciudad_id: obtenerCiudad(dato.ciudad),
                    fecha_cierre: dato.fecha_cierre,
                    inicio_contrato: dato.fecha_inicio_de_contrato,
                    fin_contrato: dato.fecha_fin_de_contrato,
                    representante_legal: dato.representante_legal,
                    email: dato.email,
                    cargo: dato.cargo,
                    ci: dato.cedula,
                    expedicion: dato.expedicion,
                    telefono: dato.telefono,
                    plan_id: obtenerPlan(dato.plan)

                })
            })
            console.log(modeloEmpresa);
            let nit = []
            await modeloEmpresa.forEach(dato => {
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
            const empresas = await modeloEmpresa.filter(dato => {
                return nitsSinRegistrar.includes(dato.nit)
            })

            await empresa.bulkCreate(empresas)
            borrarArchivo(nombre)
            return res.status(201).json({
                ok: true,
                msg: "Empresas creadas correctamente",
                regAgregados: empresas.length,
                regExistentes: respuesta.length,
                dataExcel

            })


        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error,
            msg: error.message
        })
    }
}

module.exports = cargar
