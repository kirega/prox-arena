'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'EventResults',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'EventResults',
        'eventId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Events',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onpUpdate: 'CASCADE'
        }
      );
    }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn(
      'EventResults',
      'userId'
    ).then(() => {
      return queryInterface.removeColumn(
        'EventResults',
        'eventId'
      );
    });
  }
};
