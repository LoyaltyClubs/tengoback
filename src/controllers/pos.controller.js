const tarjeta = require('../models').Tarjeta
const cliente = require('../models').Cliente

const posController = {}

posController.leerTarjeta = async (req, res) => {
    var dato = req.body.dato;
    var esValida = "SI";
    let datos;
    try {
        datos = dato.split('ñ');
    }catch (error){
        esValida="NO";
    }
    var isNominada = datos[0].includes("TARJETA")?false:true;
        const resp = {
            "element": 
                {
                    "esValida": esValida,
                    "tipoTarjeta":isNominada?"Nominada":"Innominada",
                    "cedula":isNominada?datos[1].substring(9,18):null,
                    "version":isNominada?datos[1].substring(datos[1].length-4,datos[1].length-1):null,
                    "nrotarjeta":datos[2].substring(0,datos[2].length-1),
                    "mesanioexpiracion":datos[1].substring(datos[1].length-8,datos[1].length-4)
                },
            "errors":[],
            "messages":[],
            "hasErrors":false,
            "hasMessages":false,
        }
    res.json(resp);
}

/*posController.leerTarjeta = async (req, res) => {
    var dato = req.body.dato;
    const tipoTarjeta = {}
    const { nominada = 1, innominada = 2 } = tipoTarjeta
    //funcion para respuesta de error
    let msg
    const msgError = (msg, statusCode = 401) => {
        res.status(statusCode).json({
            message: msg
        })
    }
    let modeloResp = {}
    const objRespuesta = (esValida, tipo_tarjeta, cedula, version, nrotarjeta, expiracion, error, msg) => {
        modeloResp = {
            element:
            {
                esValida: esValida,
                tipoTarjeta: tipo_tarjeta,
                cedula: cedula,
                version: version,
                nrotarjeta: nrotarjeta,
                mesanioexpiracion: expiracion
            },
            errors: [error],
            messages: [msg],
            hasErrors: false,
            hasMessages: false,
        }
    }
    try {
        ////////
        const respId = await tarjeta.findAll({
            where: {
                numero: dato
            }
        })
        ///////
        const resp = await tarjeta.findOne({
            where: {
                numero: dato,
                estado: 'vigente'
            }
        })
        //////////
        //validar que el id exista
        if (respId.length == 0) {
            msg = 'Numero de tarjeta incorrecto'
            objRespuesta(
                'no',
                null,
                null,
                null,
                null,
                null,
                '',
                msg
            )
            return res.status(400).json({ modeloResp })
        }
        if (resp !== null) {
            //validar el estado de la tarjeta
            let fecha = resp.fecha_vencimiento.toString().split(" ")
            if (resp.estado == "vigente" && resp.tipo_id == nominada) {
                resp.tipo_id = {
                    tipo: 'nominada',
                    id: resp.tipo_id
                }
                objRespuesta(
                    'si',
                    resp.tipo_id,
                    resp.cliente_id,
                    null,
                    resp.numero,
                    `${fecha[1]}-${fecha[3]}`,
                    null,
                    null
                )
                console.log(resp.tipo_id);
                return res.status(200).json({ modeloResp })
            }
            if (resp.estado == "vigente" && resp.tipo_id == innominada) {
                console.log('innominada');
                resp.tipo_id = {
                    tipo: 'innominada',
                    id: resp.tipo_id
                }
                resp.cliente_id = ''
                objRespuesta(
                    'si',
                    resp.tipo_tarjeta,
                    resp.cliente_id,
                    null,
                    resp.numero,
                    `${fecha[1]}-${fecha[3]}`,
                    null,
                    null
                )
                return res.status(200).json({ modeloResp })
            }
        }
        else {
            msg = 'La tarjeta ya no esta vigente'
            objRespuesta(
                'no',
                null,
                null,
                null,
                null,
                null,
                '',
                msg
            )
            return res.status(400).json({ modeloResp })
        }
    }
    catch (error) {
        console.log(error.message);
        console.log(error);
        // msgError(error, 500)
        objRespuesta(
            'no',
            null,
            null,
            null,
            null,
            null,
            error.name,
            error.message
        )
        return res.status(500).json({ modeloResp })
    }
}*/

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
        monto_financiar,
        cantidad_cuotas,
<<<<<<< HEAD
        monto_total,
        pie,
        diferido,
        descuento
=======
        mensaje_codigo
>>>>>>> f690685a9cf23182265d5aaad238ffe9e17e8d0e
    } = req.body
    // var total = parseFloat(req.body.monto_financiar) + req.body.monto_financiar * 0.02;
    // var cuota = total / req.body.cantidad_cuotas;
    let modeloResp, modeloRespPago, errors = {}
    const objRespPago = (apellido_paterno, apellido_materno, nombres) => {
        modeloRespPago = {
            "comercio": comercio,//se recibe
            "local": local,//se recibe
            "caja": caja,//se recibe
            "transaccion_nro": transaccion_nro,//se recibe
            "transaccion_fecha": transaccion_fecha,//se recibe
            "transaccion_hora": transaccion_hora,//se recibe
            "vendedor_nro": vendedor_nro,//se recibe
            "transaccion_tipo": transaccion_tipo,//se recibe
            "mensaje_codigo": mensaje_codigo,
            "mensaje": "Proceso realizado correctamente",
            "apellido_paterno": apellido_paterno,
            "apellido_materno": apellido_materno,
            "nombres": nombres,
            "estado_cliente": "",
            "morosidad": 0,
            "permite_abono": 1,
            "total_pagar": 42.22,
            "monto_vencido": 0.0,
            "monto_pago_anticipado": 0.0,
            "permite_recuperado": 0,
            "monto_deuda_castigada": 0.00,
            "permite_pago_minimo": 0,
            "pie_minimo_pago_minimo": 0.00,
            "saldo_pago_minimo": 0.00,
            "permite_repactacion": 0,
            "deuda_total": 100.00,
            "pie_minimo_repactacion": 0.00,
            "descuento": 0.00,//se recibe
            "saldo_repactacion": 0.00,
            "monto_afecto": 0.00
        }
    }

    const objResp = (apellido_paterno, apellido_materno, nombres, ci) => {
        modeloResp = {
            "comercio": comercio,//se recibe
            "local": local,//se recibe
            "caja": caja,//se recibe
            "transaccion_nro": transaccion_nro,//se recibe
            "transaccion_fecha": transaccion_fecha,//se recibe
            "transaccion_hora": transaccion_hora,//se recibe
            "vendedor_nro": vendedor_nro,//se recibe
            "transaccion_tipo": transaccion_tipo,//se recibe
            "codigo_mensaje": "000",
            "mensaje": "Proceso realizado correctamente",
            "apellido_paterno": apellido_paterno,
            "apellido_materno": apellido_materno,
            "nombres": nombres,
            "monto_financiar": parseFloat(monto_financiar),//se recibe
            "total_credito": 'total',
            "tasa_interes": 2,
            "tasa_impuesto_timbre": 2,
            "monto_retencion": 0.00,
            "monto_comision": 0.00,
            "codigo_autorizacion": "000000000012",
            "cantidad_cuotas": cantidad_cuotas,//se recibe
            "fecha_primer_vencimiento": "20210809",
            "valor_cuota": 'cuota',//se calcula
            "gasto_evaluacion_cuota": 0.0,
            "total_pagar_mensual": 'cuota',//se calcula
            "numero_tarjeta": numero_tarjeta,//se recibe
            "mensaje_usuario": "Ninguno",
            "carnet": ci
        }

    }
    const modeloError = (error, message) => {
        errors = {
            "errors": [error],
            "messages": [message],
            "hasError": false,
            "hasMessages": false
        }
    }

    try {
        const respTarjeta = await tarjeta.findOne({
            where: {
                numero: numero_tarjeta
            }

        })
        console.log(respTarjeta);
        if (respTarjeta != null) {
            const respCliente = await cliente.findOne({
                where: {
                    id: respTarjeta.cliente_id
                }
            })
            objResp(respCliente.apellido_paterno, respCliente.apellido_materno, respCliente.nombre, respCliente.ci)
            objRespPago(respCliente.apellido_paterno, respCliente.apellido_materno, respCliente.nombre)
            if (req.body.transaccion_tipo == "PAG")
                return res.status(200).json({
                    "element": modeloRespPago,
                    errors
                });
            else
                return res.status(200).json({
                    "element": modeloResp,
                    errors
                });
        }
        else {
            modeloError(true, 'El numero de tarjeta es incorrecto')
            return res.status(400).json({
                "element": '',
                errors
            });

        }



    } catch (error) {
        modeloError(error, error.message)
        console.log(error);
        return res.status(500).json({
            "element": null,
            errors
        });

    }


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
        console.log(error);
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

posController.pagoCuota = (req, res) => {
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
        "respuesta_codigo":"0000",
        "mensaje":"Pago realizado correctamente",
        "autorizacion_codigo":"000000000012",
        "monto_afecto_pagado":req.body.monto_abonado
    }
    return res.status(200).json({ "element": resp, "errors": [], "messages": [], "hasError": false, "hasMessages": false });
}

posController.confirmacionFinanciamiento = (req, res) => {
    const resp = {
        "comercio":req.body.comercio,//se recibe
        "local":req.body.local,//se recibe
        "caja":req.body.caja,//se recibe,
        "transaccion_nro":req.body.transaccion_nro,
        "transaccion_fecha":req.body.transaccion_fecha,
        "transaccion_hora":req.body.transaccion_hora,
        "vendedor_nro":req.body.vendedor_nro,//se recibe
        "transaccion_tipo":req.body.transaccion_tipo,//se recibe
        "codigo_mensaje":req.body.mensaje_codigo,
        "codigo_respuesta":"0000",
        "bolet_nro":"   "
    }
    res.json({ "element": resp, "errors": [], "messages": [], "hasError": false, "hasMessages": false })
}

module.exports = posController;