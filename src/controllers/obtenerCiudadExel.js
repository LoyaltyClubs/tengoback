
const obtenerCiudad = (dato) => {
    let ciudad = dato.replace(' ', '').toLowerCase()
    // console.log(ciudad, 'es el dato');

    if (ciudad == 'santacruz') { return 1 }
    if (ciudad == 'lapaz') { return 2 }
    if (ciudad == 'cochabamba') { return 3 }
    if (ciudad == 'tarija') { return 4 }
    if (ciudad == 'chuquisaca') { return 5 }
    if (ciudad == 'potosi') { return 6 }
    if (ciudad == 'oruro') { return 7 }
    if (ciudad == 'pando') { return 8 }
    if (ciudad == 'beni') { return 9 }
}

const obtenerRubro = (dato) => {
    let ciudad = dato.replace(' ', '').toLowerCase()
    // console.log(ciudad, 'es el dato');
    if (ciudad == 'tecnológico') { return 1 }
    if (ciudad == 'industrial') { return 2 }
    if (ciudad == 'alimenticio') { return 3 }
    if (ciudad == 'electrodomésticos') { return 4 }
    if (ciudad == 'saludybelleza') { return 5 }
    if (ciudad == 'supermercado') { return 6 }
    if (ciudad == 'automotriz') { return 7 }
    if (ciudad == 'farmacias') { return 8 }
    if (ciudad == 'tiendaderegalo') { return 9 }
}


module.exports = {
    obtenerCiudad,
    obtenerRubro
}