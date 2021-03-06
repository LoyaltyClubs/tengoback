const credito = require('../models').Credito;
const cliente = require('../models').Cliente;
const modelCuota = require('../models').Cuota;
const plan = require('../models').Plan;
const cuota_mensual = require('../models').Cuota_Mensual;
const pago = require('../models').Pago;
const transaccion = require('../models').Transaccion;
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const ClienteService = {
    calculoCuotas(interes, cuotas, capital){
        var i = parseFloat(interes)/100;
        var c = parseFloat(capital);
        var cu = parseInt(cuotas);
        var resultado = (c*i)/(1-Math.pow(1+i,-cu));
        var m = Number((Math.abs(resultado) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(resultado);
    },

    async obtenerCodAutorizacion(id){
        //Buscar si ese cliente tiene algun otro credito sin confirmar para usar el mismo cod_autorizacion
        //Sino tuviera crear uno nuevo
        var cred = await credito.findOne({where: {cliente_id: id, estado: 'SIN CONFIRMAR'}});
        return cred!=null?cred.cod_autorizacion:Date.now();        
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
    },

    async confirmarCredito(boleta){
        const cred = await credito.findOne({where: {cod_autorizacion: parseInt(boleta), estado: 'SIN CONFIRMAR'}});
        if (cred==null)
            return "001";
        else
            credito.update({estado: "ACTIVA"},{where: {id: cred.id}})
        return "000";
    },
    async calculoPago(datosCliente, transaccion_nro, transaccion_fecha){
        const datosPlan = await plan.findOne({where: {id: datosCliente.Empresa.plan_id}});
        const consolidadoCuota = await cuota_mensual.sum('monto_total',{where: {estado: {[Op.not]: "PAGADO"}}});
        await transaccion.create({
            nro: transaccion_nro,
            fecha: transaccion_fecha,
            ci: datosCliente.ci 
        });
        var montoAdelantado = 0;
        if (consolidadoCuota<1){
            for (var i=0;i<datosCliente.Creditos.length;i++){
                montoAdelantado = montoAdelantado + parseFloat(datosCliente.Creditos[i].monto_cuota);
            }
            return montoAdelantado;
        }
        return consolidadoCuota;
    },
    async pagoCuota(transaccion_nro, transaccion_fecha, monto, nro_vendedor, forma_pago, nro_comprobante){
        var tran = await transaccion.findOne({where: {nro: parseInt(transaccion_nro), fecha: transaccion_fecha}});
        var datosCliente = await cliente.findOne({where: {ci: tran.ci}});
        console.log(datosCliente);
        try {
            var pag = await pago.create({
                nro_transaccion: transaccion_nro,
                fecha_transaccion: new Date(),
                nro_vendedor,
                forma_pago,
                monto_abonado: parseFloat(monto),
                nro_comprobante,
                ci_cliente: datosCliente.ci,
                cliente_id: datosCliente.id
            });
        }catch(error){
            return "001"
        }
        //obtener total de deuda
        
        //repartir monto en todas las cuotas
        
        return "000";
    }
}

module.exports = ClienteService;

