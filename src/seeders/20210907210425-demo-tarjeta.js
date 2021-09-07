'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Tarjeta', [
      {
        numero: '6158102000009983',
        fecha_vencimiento: '05/25',
        estado: 'Vigente',
        cliente_id: 5,
        tipo_id: 10,
        saldo: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
