const empresa = require('../models').Empresa

const obtenerCiudad = (dato) => {
    let ciudad = dato.replace(' ', '').toLowerCase()
    console.log(ciudad, 'es el dato');

    if (ciudad == 'santacruz') {
        return 1
    }
    if (ciudad == 'lapaz') {
        return 2
    }
    if (ciudad == 'cochabamba') {
        return 3
    }
    if (ciudad == 'tarija') {
        return 4
    }
    if (ciudad == 'chuquisaca') {
        return 5
    }
    if (ciudad == 'potosi') {
        return 6
    }
    if (ciudad == 'oruro') {
        return 7
    }
    if (ciudad == 'pando') {
        return 8
    }
    if (ciudad == 'beni') {
        return 9
    }
}

const obtenerEmpresa = async (dato) => {
    // let ciudad = dato.replace(' ', '').toLowerCase()
    try {
        const resp = await empresa.findOne({ where: { nombre: dato } })
        return (resp != null) ? resp.id : 'no existe una empresa con ese nombre'

    } catch (error) {
        console.log({
            error,
            message: error.message
        });
        return {
            error,
            message: error.message
        }
    }

}

module.exports = {
    obtenerCiudad,
    obtenerEmpresa
}