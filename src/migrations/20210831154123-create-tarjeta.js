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
        type: Sequelize.INTEGER
      },
      fecha_vencimiento: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.STRING
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
        references: {
          model: 'Tipo_tarjeta',
          key: 'id'
        }
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