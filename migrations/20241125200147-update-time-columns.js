'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Bookings', 'startTime', {
      type: Sequelize.TIME,
      allowNull: false,
    });

    await queryInterface.changeColumn('Bookings', 'endTime', {
      type: Sequelize.TIME,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Bookings', 'startTime', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('Bookings', 'endTime', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
