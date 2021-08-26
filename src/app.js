const express = require('express')
const morgan = require('morgan')

const app = express()
const cors = require("cors");

app.set('port', process.env.PORT || 8000);

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api/pos", require("./routes/pos.routes"))
app.use("/api/ciudad", require("./routes/ciudad.routes"))
app.use("/api/plan", require("./routes/plan.routes"))
app.use("/api/rubro", require("./routes/rubro.routes"))
app.use("/api/empresa", require("./routes/empresa.routes"))

module.exports = app;