const posController = {}

posController.leerTarjeta = (req, res) => {
    var dato = req.body.dato;
    let datos = dato.split('ñ');
    const resp = {
        "element": 
            {
                "esValida": "SI",
                "tipoTarjeta":datos[0].includes("Tarjeta")?"Innominada":"Nominada",
                "cedula":null,
                "version":null,
                "nrotarjeta":datos[2].substring(0,datos[2].length-1),
                "mesanioexpiracion":datos[1].substring(datos[1].length-8,datos[1].length-4)
            },
        "errors":[],
        "messages":[],
        "hasErrors":false,
        "hasMessages":false,
    }
    res.json(resp)


}

posController.finaciamiento = (req, res) => {
    var total = parseFloat(req.body.monto_financiar)+req.body.monto_financiar*0.02;
    var cuota = total/req.body.cantidad_cuotas;

    const respPago = {
        "comercio":req.body.comercio,//se recibe
        "local":req.body.local,//se recibe
        "caja":req.body.caja,//se recibe
        "transaccion_nro":req.body.transaccion_nro,//se recibe
        "transaccion_fecha":req.body.transaccion_fecha,//se recibe
        "transaccion_hora":req.body.transaccion_hora,//se recibe
        "vendedor_nro":req.body.vendedor_nro,//se recibe
        "transaccion_tipo":req.body.transaccion_tipo,//se recibe
        "codigo_mensaje":000,
        "mensaje":"Proceso realizado correctamente",
        "apellido_paterno":"arroyo",
        "apellido_materno":"cuellar",
        "nombres":"ashley erwin joel",    
        "estado_cliente":"",
        "morosidad":0,
        "permite_abono":1,
        "total_pagar":42.22,
        "monto_vencido":0.0,
        "monto_pago_anticipado":0.0,
        "permite_recuperado":0,
        "monto_deuda_castigada":0.00,
        "permite_p_minimo":0,
        "pie_minimo_p_minimo":0.00,
        "saldo_p_minimo":0.00,
        "permite_repactacion":0,
        "deuda_total":100.00,
        "pie_minimo_repactacion":0.00,
        "descuento":0.00,//se recibe
        "saldo_repactacion":0.00,
        "monto_afecto":0.00
    }

    const resp = {
        "comercio":req.body.comercio,//se recibe
        "local":req.body.local,//se recibe
        "caja":req.body.caja,//se recibe
        "transaccion_nro":req.body.transaccion_nro,//se recibe
        "transaccion_fecha":req.body.transaccion_fecha,//se recibe
        "transaccion_hora":req.body.transaccion_hora,//se recibe
        "vendedor_nro":req.body.vendedor_nro,//se recibe
        "transaccion_tipo":req.body.transaccion_tipo,//se recibe
        "codigo_mensaje":"000",
        "mensaje":"Proceso realizado correctamente",
        "apellido_paterno":"arroyo",
        "apellido_materno":"cuellar",
        "nombres":"ashley erwin joel",    
        "monto_financiar":parseFloat(req.body.monto_financiar),//se recibe
        "total_credito":total,
        "tasa_interes":2,
        "tasa_impuesto_timbre":2,
        "monto_retencion":0.00,
        "monto_comision":0.00,
        "codigo_autorizacion":"000000000012",
        "cantidad_cuotas":req.body.cantidad_cuotas,//se recibe
        "fecha_primer_vencimiento":"20210809",
        "valor_cuota":cuota,//se calcula
        "gasto_evaluacion_cuota":0.0,
        "total_pagar_mensual":cuota,//se calcula
        "numero_tarjeta":req.body.numero_tarjeta,//se recibe
        "mensaje_usuario":"Ninguno",
        "carnet":"7842022"
    }
    if (req.body.transaccion_tipo=="PAG")
        res.json({"element":respPago,"errors":[],"messages":[],"hasError":false,"hasMessages":false});
    else
        res.json({"element":resp,"errors":[],"messages":[],"hasError":false,"hasMessages":false});
}

posController.validarTarjeta = (req, res) => {
    const { id } = req.params;
    res.json(
        {
            "dtFechaActiva":"2021-03-04T14:19:52",
            "existe":true
        }
    );
}

posController.activarTarjeta = (req, res) => {
    // recibir parametros y guardar en bd farmacorp
    res.json(
        {
            "ok":true
        }
    );
}

posController.actualizarTarjeta = (req, res) => {
    // actualizar en bd farmacorp
    res.json(
        {
            "ok":true
        }
    );
}

posController.pagoCuota = (req, res) => {
    const resp = {
        "comercio":req.body.comercio,//se recibe
        "local":req.body.local,//se recibe
        "caja":req.body.caja,//se recibe
        "vendedor_nro":req.body.vendedor_nro,//se recibe
        "transaccion_tipo":req.body.transaccion_tipo,//se recibe
        "codigo_mensaje":req.body.codigo_mensaje,
        "codigo_respuesta":"0000",
        "mensaje":"Pago realizado correctamente",
        "codigo_autorizacion":"000000000012",
        "monto_afecto_pagado":req.body.monto_abonado
    }
    res.json({"element":resp,"errors":[],"messages":[],"hasError":false,"hasMessages":false});
}

posController.confirmacionFinanciamiento = (req, res) => {
    const resp = {
        "comercio":req.body.comercio,//se recibe
        "local":req.body.local,//se recibe
        "caja":req.body.caja,//se recibe
        "vendedor_nro":req.body.vendedor_nro,//se recibe
        "transaccion_tipo":req.body.transaccion_tipo,//se recibe
        "codigo_mensaje":req.body.codigo_mensaje,
        "codigo_respuesta":"0000",
        "mensaje":"Correcto",
        "bolet_nro":"   "
    }
    res.json({"element":resp,"errors":[],"messages":[],"hasError":false,"hasMessages":false})
}

module.exports = posController;