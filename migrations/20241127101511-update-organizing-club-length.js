module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('bookings', 'organizingClub', {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('bookings', 'organizingClub', {
      type: Sequelize.STRING(255), // Original size
      allowNull: true,
    });
  },
};
