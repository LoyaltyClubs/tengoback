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
   await queryInterface.bulkInsert('Plan', [{
      nombre: "Corporativo Gold",
      seguro: 0,
      mantenimiento: 0,
      recargo: 2.8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: "Corporativo Plus",
      seguro: 7,
      mantenimiento: 13,
      recargo: 2.8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: "Cliente Independiente",
      seguro: 7,
      mantenimiento: 20,
      recargo: 2.80,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: "Corporativo Funcionario",
      seguro: 0,
      mantenimiento: 0.00,
      recargo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Plan', null, {});
  }
};
