const cargarExcel = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }
    const { archivo } = req.files
    try {
        const nombre = await subirArchivo(archivo, ['xlsx'], '');

        const worbook = XLSX.readFile(`uploads/${nombre}`);
        const worbookSheets = worbook.SheetNames;
        const dataExcel = XLSX.utils.sheet_to_json(worbook.Sheets[worbookSheets[0]]);

        let carnets = [];

        await dataExcel.forEach(dato => { // sacar todos los carnets del archivo excel
            carnets.push(dato.ci)
        })

        const respuesta = await Customer.findAll({
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

        const customers = await dataExcel.filter(dato => {
            return carnetsSinRegistrar.includes(dato.ci)
        })

        await Customer.bulkCreate(customers)
        res.status(201).json({
            ok: true,
            msg: "Clientes creados correctamente",
            regAgregados: customers.length,
            regExistentes: respuesta.length,
            dataExcel

        })

    } catch (error) {
        res.status(400).json({
            error,
            msg: "error al cargar clientes"
        })
    }
}

module.exports = cargarExcel