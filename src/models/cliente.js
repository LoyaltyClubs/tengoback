'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cliente.init({
    nombre: DataTypes.STRING,
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    fecha_nacimineto: DataTypes.DATE,
    sexo: DataTypes.STRING,
    ci: DataTypes.integer,
    calle_particular: DataTypes.STRING,
    zona: DataTypes.STRING,
    provincia: DataTypes.STRING,
    barrio: DataTypes.STRING,
    ciudad_id: DataTypes.integer,
    telefono_fijo: DataTypes.integer,
    telefono_celular: DataTypes.integer,
    email: DataTypes.STRING,
    nombre_referencia: DataTypes.STRING,
    provincia_referencia: DataTypes.STRING,
    telefono_referencia: DataTypes.STRING,
    tipo_tel_referencia: DataTypes.STRING,
    ciudad_referencia: DataTypes.STRING,
    dia_pago: DataTypes.integer,
    linea_credito: DataTypes.decimal,
    estado: DataTypes.string,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};