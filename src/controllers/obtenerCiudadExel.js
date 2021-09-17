
const obtenerCiudad = (dato) => {
    let ciudad = dato.replace(' ', '').toLowerCase()
    // console.log(ciudad, 'es el dato');

    if (ciudad == 'santacruz') { return 5 }
    if (ciudad == 'lapaz') { return 15 }
    if (ciudad == 'cochabamba') { return 25 }
    if (ciudad == 'tarija') { return 35 }
    if (ciudad == 'chuquisaca') { return 45 }
    if (ciudad == 'potosi') { return 55 }
    if (ciudad == 'oruro') { return 65 }
    if (ciudad == 'pando') { return 75 }
    if (ciudad == 'beni') { return 85 }
}

const obtenerRubro = (dato) => {
    let ciudad = dato.replace(' ', '').toLowerCase()
    // console.log(ciudad, 'es el dato');
    if (ciudad == 'tecnológico') { return 5 }
    if (ciudad == 'industrial') { return 15 }
    if (ciudad == 'alimenticio') { return 25 }
    if (ciudad == 'electrodomésticos') { return 35 }
    if (ciudad == 'saludybelleza') { return 45 }
    if (ciudad == 'supermercado') { return 55 }
    if (ciudad == 'automotriz') { return 65 }
    if (ciudad == 'farmacias') { return 75 }
    if (ciudad == 'tiendaderegalo') { return 85 }
}
const obtenerPlan = (dato) => {
    let ciudad = dato.replace(' ', '').toLowerCase()
    // console.log(ciudad, 'es el dato');
    if (ciudad == 'corporativogold') { return 5 }
    if (ciudad == 'corporativoplus') { return 15 }
    if (ciudad == 'clienteindependiente') { return 25 }
    if (ciudad == 'corporativofuncionario') { return 35 }
}


module.exports = {
    obtenerCiudad,
    obtenerRubro,
    obtenerPlan
}