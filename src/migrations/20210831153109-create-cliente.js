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
      fecha_nacimiento: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING
      },
      ci: {
        type: Sequelize.INTEGER
      },
      calle_particular: {
        type: Sequelize.STRING
      },
      zona: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      barrio: {
        type: Sequelize.STRING
      },
      ciudad_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ciudad',
          key: 'id'
        }
      },
      telefono_fijo: {
        type: Sequelize.INTEGER
      },
      telefono_celular: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      nombre_referencia: {
        type: Sequelize.STRING
      },
      provincia_referencia: {
        type: Sequelize.STRING
      },
      telefono_referencia: {
        type: Sequelize.STRING
      },
      tipo_tel_referencia: {
        type: Sequelize.STRING
      },
      ciudad_referencia: {
        type: Sequelize.STRING
      },
      dia_pago: {
        type: Sequelize.INTEGER
      },
      linea_credito: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
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
    await queryInterface.dropTable('Cliente');
  }
};