'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cuota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      nro_de_cuota: {
        type: Sequelize.INTEGER
      },
      monto: {
        type: Sequelize.DECIMAL
      },
      fecha_limite: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.STRING
      },
      credito_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Creditos',
          key: 'id'
        } 
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
    await queryInterface.dropTable('Cuota');
  }
};