'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Empresa', [{
      nombre: "Loyalty Clubs",
      razon_social: "Loyalty Clubs SA",
      nit: "12345678",
      rubro_id: 5,
      direccion: "Edificio Madero Oficina 6",
      ciudad_id: 5,
      fecha_cierre: 5,
      inicio_contrato: new Date(2021,1,1),
      fin_contrato: new Date(2021,12,31),
      representante_legal: "Mariel Rivas",
      email: "mrivas@loyaltyclubs.net",
      cargo: "Gerente General",
      ci: "12345678",
      expedicion: "SC",
      telefono: "7777777",
      plan_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
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
