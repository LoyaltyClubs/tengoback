'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    //Add seed commands here.

    //Example:
    await queryInterface.bulkInsert('Tipo_tarjeta', [
      {
        nombre: 'Nominada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Innominada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { });

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     *///Example:
    await queryInterface.bulkDelete('Tipo_tarjeta', null, { });

  }
};
