'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      seguro: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      mantenimiento: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      recargo: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      interes: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      mora: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      deleted: {
        type:Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('Plan');
  }
};