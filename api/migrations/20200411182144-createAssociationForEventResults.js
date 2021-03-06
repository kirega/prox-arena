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
      'UserId',
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
        'EventId',
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
      'UserId'
    ).then(() => {
      return queryInterface.removeColumn(
        'EventResults',
        'EventId'
      );
    });
  }
};
