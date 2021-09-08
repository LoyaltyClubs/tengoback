const ClienteService = {
    calculoCuotas(interes, cuotas, capital){
        var i = parseFloat(interes)/100;
        var c = parseFloat(capital);
        var cu = parseInt(cuotas);
        var resultado = (c*i)/(1-Math.pow(1.0278,-cu));
        var m = Number((Math.abs(resultado) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(resultado);
    }
}

module.exports = ClienteService;

