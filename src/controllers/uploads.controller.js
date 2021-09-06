const path = require('path')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const subirArchivo = (archivo, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'xlsx'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const nombrecortado = archivo.name.split('.');
        const extension = nombrecortado[nombrecortado.length - 1];
        // Valida la extendion
        if (!extensionesValidas.includes(extension)) {
            return reject(`la extension ${extension} no es permitida, ${extensionesValidas}`)
        }
        const nombreTemp = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, '../../uploads/', carpeta, nombreTemp);
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nombreTemp);
        });
    })

}

const borrarArchivo = (nombre, carpeta = '') => {
    console.log(nombre)
    return new Promise((resolve, reject) => {
        const pathFile = path.join(__dirname, '../../uploads/', carpeta, nombre)
        console.log(pathFile)
        if (!fs.existsSync(pathFile)) {
            return reject(false)
        } else {
            fs.unlinkSync(pathFile)
            return resolve(true);
        }
    })
}

module.exports = {
    subirArchivo,
    borrarArchivo
}