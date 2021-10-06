'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tarjeta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero: {
        type: Sequelize.STRING
      },
      fecha_vencimiento: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: "Vigente"
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cliente',
          key: 'id'
        }
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tipo_tarjeta',
          key: 'id'
        }
      },
      saldo: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0
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
    await queryInterface.dropTable('Tarjeta');
  }
};