const credito = require('../models').Credito;
const modelCuota = require('../models').Cuota;
const ClienteService = {
    calculoCuotas(interes, cuotas, capital){
        var i = parseFloat(interes)/100;
        var c = parseFloat(capital);
        var cu = parseInt(cuotas);
        var resultado = (c*i)/(1-Math.pow(1.0278,-cu));
        var m = Number((Math.abs(resultado) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(resultado);
    },

    async obtenerCodAutorizacion(id){
        //Buscar si ese cliente tiene algun otro credito sin confirmar para usar el mismo cod_autorizacion
        //Sino tuviera crear uno nuevo
        var cred = await credito.findOne({where: {cliente_id: id, estado: 'SIN CONFIRMAR'}});
        return cred!=null?cred.cod_autorizacion:123;        
    },

    async crearCreditoCuotas(cod_autorizacion,descripcion,cant_cuotas,dia_pago,monto_de_cuota, monto_financiado, total_credito,cliente_id){
        //crear lista de todas las cuotas
        var listCuotas = [];
        var fecha_actual = new Date();
        var fecha_pago = new Date(fecha_actual.getFullYear(),fecha_actual.getMonth()+1,dia_pago);
        var fecha_cuotas = new Date(fecha_pago);
        for (var i=1; i<=cant_cuotas;i++){
            listCuotas.push({descripcion: i+" cuota", nro_de_cuota: i, monto: monto_de_cuota,fecha_limite:fecha_cuotas.setMonth(fecha_pago.getMonth()+i-1), estado: "POR PAGAR"})
            
        }
        //eliminar antigua cotizacion
        var cred = await credito.findOne({where: {cod_autorizacion: cod_autorizacion}});
        if (cred!=null){
            await modelCuota.destroy({where: {credito_id: cred.id}});
            await credito.destroy({where: {id: cred.id}});
        }
            
        return credito.create({
            descripcion: descripcion,
            secuencia: 1,
            fecha: fecha_actual,
            cod_autorizacion: cod_autorizacion,
            estado: 'SIN CONFIRMAR',
            nro_cuotas: cant_cuotas,
            monto_capital: monto_financiado,
            monto_financiado: total_credito,
            monto_cuota: monto_de_cuota,
            fecha_primer_cuota: fecha_pago,
            cliente_id: cliente_id,
            createdAt: new Date(),
            updatedAt: new Date(),
            Cuota: listCuotas
        },{include: [
            'Cuota',
        ]});
    }
}

module.exports = ClienteService;

