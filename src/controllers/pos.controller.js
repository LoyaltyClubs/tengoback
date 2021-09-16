const tarjeta = require('../models').Tarjeta
const cliente = require('../models').Cliente
const empresa = require('../models').Empresa

const ClienteService = require('../services/cliente.service');


const posController = {}

posController.leerTarjeta = async (req, res) => {
    var dato = req.body.dato;
    var esValida = "SI";
    let datos;
    try {
        datos = dato.split('ñ');
        var tar = await tarjeta.findOne({ where: { numero: datos[2].substring(0, datos[2].length - 1), estado: "Vigente" } });
        esValida = tar != null && tar.saldo > 0 ? "SI" : "NO"
        var isNominada = datos[0].includes("TARJETA") ? false : true;
    } catch (error) {
        esValida = "NO";
    }
    const resp = {
        "element":
        {
            "esValida": esValida,
            "tipoTarjeta": isNominada ? "Nominada" : "Innominada",
            "cedula": isNominada ? datos[1].substring(9, 18) : null,
            "version": isNominada ? datos[1].substring(datos[1].length - 4, datos[1].length - 1) : null,
            "nrotarjeta": datos[2].substring(0, datos[2].length - 1),
            "mesanioexpiracion": datos[1].substring(datos[1].length - 8, datos[1].length - 4)
        },
        "errors": [],
        "messages": [],
        "hasErrors": false,
        "hasMessages": false,
    }
    res.json(resp);
}

posController.finaciamiento = async (req, res) => {
    const {
        numero_tarjeta,
        comercio,
        local,
        caja,
        transaccion_nro,
        transaccion_fecha,
        transaccion_hora,
        vendedor_nro,
        transaccion_tipo,
        mensaje_codigo,
        rut_titular,
        rut_adicional,
        version_tarjeta,
        producto_credito,
        monto_financia,
        cantidad_cuotas,
        monto_total,
        pie,
        diferido,
        descuento
    } = req.body
    var mensaje;

    const datosCliente = await tarjeta.findOne({where: {numero: numero_tarjeta, deleted: false}, include: ['Cliente']});
    const planCliente = await empresa.findOne({where: {id: datosCliente.Cliente.empresa_id, deleted: false}, include: ['Plan']});
    mensaje=datosCliente==null?"Tarjeta Innomidada no es de un cliente":"Financiamiento Aprobado";
    const monto_cuota = await ClienteService.calculoCuotas(planCliente.Plan.interes,cantidad_cuotas, monto_financia);
    
    var total_credito = monto_cuota*parseInt(cantidad_cuotas);
    const fecha = new Date();
    const cod_autorizacion = await ClienteService.obtenerCodAutorizacion(datosCliente.Cliente.id);
    var cred = await ClienteService.crearCreditoCuotas(cod_autorizacion,"Compra en "+comercio,cantidad_cuotas,datosCliente.Cliente.dia_pago,monto_cuota,monto_financia,total_credito,datosCliente.Cliente.id);
   

    const resp = {
        "comercio":comercio,//se recibe
        "local":local,//se recibe
        "caja":caja,//se recibe
        "transaccion_nro":transaccion_nro,//se recibe
        "transaccion_fecha":transaccion_fecha,//se recibe
        "transaccion_hora":transaccion_hora,//se recibe
        "vendedor_nro":vendedor_nro,//se recibe
        "transaccion_tipo":transaccion_tipo,//se recibe
        "codigo_mensaje":mensaje_codigo,
        "mensaje":mensaje,
        "apellido_paterno":datosCliente.Cliente.apellido_paterno,
        "apellido_materno":datosCliente.Cliente.apellido_materno,
        "nombres":datosCliente.Cliente.nombre,    
        "monto_financiar":monto_financia*100,//se recibe
        "total_credito":total_credito.toString(),
        "tasa_interes":planCliente.Plan.interes*100,
        "tasa_impuesto_timbre":"",
        "monto_retencion":"0.00",
        "monto_comision":"0.00",
        "codigo_autorizacion":cod_autorizacion,
        "cantidad_cuotas":cantidad_cuotas,
        "fecha_primer_vencimiento":fecha.getFullYear().toString()+(fecha.getMonth()+2).toLocaleString('en-US',{minimumIntegerDigits: 2,
            useGrouping: false})+datosCliente.Cliente.dia_pago.toLocaleString('en-US',{minimumIntegerDigits: 2,
                useGrouping: false}),
        "valor_cuota":(monto_cuota*100).toString(),
        "total_pagar_mensual":(monto_cuota*100).toString(),
        "numero_tarjeta":numero_tarjeta,
        "mensaje_usuario":"  ",
        "carnet":datosCliente.Cliente.ci.toString()
    }
    res.json({"element":resp,"errors":[],"messages":[],"hasError":false,"hasMessages":false});
}

posController.consultaEstado = async (req, res) => {
    const {
        comercio,
        local,
        caja,
        transaccion_nro,
        transaccion_fecha,
        transaccion_hora,
        vendedor_nro,
        transaccion_tipo,
        mensaje_codigo,
        rut_titular,
        rut_adicional
    } = req.body

    //Buscar cliente
    const datosCliente = await cliente.findOne({where: {ci: parseInt(rut_titular), deleted: false}, include: ['Creditos', 'Empresa']});
    var total =await ClienteService.calculoPago(datosCliente, transaccion_nro, transaccion_fecha);

    const respPago = {
        "comercio":comercio,//se recibe
        "local":local,//se recibe
        "caja":caja,//se recibe
        "transaccion_nro":transaccion_nro,//se recibe
        "transaccion_fecha":transaccion_fecha,//se recibe
        "transaccion_hora":transaccion_hora,//se recibe
        "vendedor_nro":vendedor_nro,//se recibe
        "transaccion_tipo":transaccion_tipo,//se recibe
        "mensaje_codigo":"000",//se recibe,
        "mensaje":"Envio opciones de Pago..",
        "apellido_paterno":datosCliente.apellido_paterno,
        "apellido_materno":datosCliente.apellido_materno,
        "nombres":datosCliente.nombre,    
        "estado_cliente":datosCliente.estado,
        "morosidad":0,
        "permite_abono":datosCliente.estado=="BLOQUEADO"?"0":"1",
        "total_pagar":(total*100).toString(),
        "monto_vencido":0.0,
        "monto_pago_anticipado":0.0,
        "permite_recuperado":0,
        "monto_deuda_castigada":0.00,
        "permite_pago_minimo":0,
        "pie_minimo_pago_minimo":0.00,
        "saldo_pago_minimo":0.00,
        "permite_repactacion":0,
        "deuda_total":(total*100).toString(),
        "pie_minimo_repactacion":0.00,
        "descuento":0.00,
        "saldo_repactacion":0.00,
        "monto_afecto":0.00
    }
    res.json({"element":respPago,"errors":[],"messages":[],"hasError":false,"hasMessages":false});
}

posController.validarTarjeta = async (req, res) => {
    const { id } = req.params;
    let tarjetaValida = {}
    const respTarjetaValida = (existe, fecha) => {
        tarjetaValida = {
            dtFechaActiva: fecha,
            existe: existe
        }
    }
    try {
        const resp = await tarjeta.findOne({
            where: {
                numero: id,
                estado: 'Vigente'
            }
        })
        if (resp !== null) {
            //if (resp.estado == 'vigente') {
            respTarjetaValida(true, resp.fecha_vencimiento)
            res.status(200).json({ tarjetaValida })
            //}
        }
        else {
            respTarjetaValida(false, '')
            res.status(400).json({ tarjetaValida })

        }
    } catch (error) {
        res.status(500).json({ error })

    }
}

posController.activarTarjeta = (req, res) => {
    // recibir parametros y guardar en bd farmacorp
    // cedula, fechaActivacion, idTarjeta
    res.json(
        {
            "ok": true
        }
    );
}

posController.actualizarTarjeta = (req, res) => {
    // actualizar en bd farmacorp
    res.json(
        {
            "ok": true
        }
    );
}

posController.pagoCuota = async (req, res) => {
    const {
        comercio,
        local,
        caja,
        transaccion_nro,
        transaccion_fecha,
        transaccion_hora,
        vendedor_nro,
        transaccion_tipo,
        mensaje_codigo,
        tipo_pago,
        monto_abonado,
        nro_comprobante,
        forma_pago
    } = req.body

    var resu = await ClienteService.pagoCuota(transaccion_nro,transaccion_fecha,monto_abonado,vendedor_nro,forma_pago,nro_comprobante)

    //tipo_pago = "ABO", forma_pago="1", nro_comprobante="3523523"
    const resp = {
        "comercio":req.body.comercio,//se recibe
        "local":req.body.local,//se recibe
        "caja":req.body.caja,//se recibe
        "transaccion_nro":req.body.transaccion_nro,
        "transaccion_fecha":req.body.transaccion_fecha,
        "transaccion_hora":req.body.transaccion_hora,
        "vendedor_nro":req.body.vendedor_nro,//se recibe
        "transaccion_tipo":req.body.transaccion_tipo,//se recibe
        "mensaje_codigo":req.body.mensaje_codigo,
        "respuesta_codigo":resu,
        "mensaje":resu=="000"?"Pago realizado correctamente":"Ocurrio un problema con el pago",
        "autorizacion_codigo":"000000000012",
        "monto_afecto_pagado":req.body.monto_abonado
    }
    return res.status(200).json({ "element": resp, "errors": [], "messages": [], "hasError": false, "hasMessages": false });
}

posController.confirmacionFinanciamiento = async (req, res) => {
    const {
        nro_boleta,
        carnet
    } = req.body

    codigo_resp = await ClienteService.confirmarCredito(nro_boleta);

    const resp = {
        "comercio": req.body.comercio,//se recibe
        "local": req.body.local,//se recibe
        "caja": req.body.caja,//se recibe,
        "transaccion_nro": req.body.transaccion_nro,
        "transaccion_fecha": req.body.transaccion_fecha,
        "transaccion_hora": req.body.transaccion_hora,
        "vendedor_nro": req.body.vendedor_nro,//se recibe
        "transaccion_tipo": req.body.transaccion_tipo,//se recibe
        "codigo_mensaje": req.body.mensaje_codigo,
        "codigo_respuesta": codigo_resp,
        "boleta_nro": codigo_resp == "000" ? nro_boleta : "No se encuentra"
    }
    res.json({ "element": resp, "errors": [], "messages": [], "hasError": false, "hasMessages": false })
}


module.exports = posController;