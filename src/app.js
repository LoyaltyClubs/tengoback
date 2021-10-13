const express = require('express')
const morgan = require('morgan')
const fileUpload = require('express-fileupload');


const app = express()
const cors = require("cors");

app.set('port', process.env.PORT || 8000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

app.use('/uploads', express.static('./uploads'))

app.use("/api/pos", require("./routes/pos.routes"))
app.use("/api/ciudad", require("./routes/ciudad.routes"))
app.use("/api/plan", require("./routes/plan.routes"))
app.use("/api/rubro", require("./routes/rubro.routes"))
app.use("/api/empresa", require("./routes/empresa.routes"))
app.use("/api/cliente", require("./routes/cliente.routes"))
app.use("/api/credito", require("./routes/credito.routes"))
app.use("/api/cuotas", require("./routes/cuotas.routes"))
app.use("/api/tipo_tarjeta", require("./routes/tipo_tarjeta.routes"))
app.use("/api/tarjeta", require("./routes/tarjeta.routes"))
app.use("/api/carga_archivos", require("./routes/carga_archivos.routes"))
app.use("/api/pago", require("./routes/pago.routes"))
app.use("/api/provincia", require("./routes/provincia.routes"))
app.use("/api/cuota_mensual", require("./routes/cuota_mensual.routes"))
app.use("/api/settings", require("./routes/settings.routes"))

module.exports = app;