'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cliente', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido_paterno: {
        type: Sequelize.STRING
      },
      apellido_materno: {
        type: Sequelize.STRING
      },
      estado_civil: {
        type: Sequelize.STRING
      },
      fecha_nacimineto: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING
      },
      ci: { type: Sequelize.integer },
      calle_particular: { type: Sequelize.STRING },
      zona: { type: Sequelize.STRING },
      provincia: { type: Sequelize.STRING },
      barrio: { type: Sequelize.STRING },
      ciudad_id: {
        type: Sequelize.integer,
        references: {
          model: 'Ciudad',
          key: 'id'
        }
      },
      telefono_fijo: { type: Sequelize.integer },
      telefono_celular: { type: Sequelize.integer },
      email: { type: Sequelize.STRING },
      nombre_referencia: { type: Sequelize.STRING },
      provincia_referencia: { type: Sequelize.STRING },
      telefono_referencia: { type: Sequelize.STRING },
      tipo_tel_referencia: { type: Sequelize.STRING },
      ciudad_referencia: { type: Sequelize.STRING },
      dia_pago: { type: Sequelize.integer },
      linea_credito: { type: Sequelize.decimal },
      estado: { type: Sequelize.string },
      deleted: { type: Sequelize.BOOLEAN },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clientes');
  }
};