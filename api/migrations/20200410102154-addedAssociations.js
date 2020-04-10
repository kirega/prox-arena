'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    // return queryInterface.addColumn(
    //   'Users', // name of Source model
    //   'teamId', // name of the key we're adding 
    //   {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'teams', // name of Target model
    //       key: 'id', // key in Target model that we're referencing
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   }
    //   );
      return queryInterface.addColumn(
        'Users', // name of Source model
        'paymentStatus', // name of the key we're adding 
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false 
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
      'Users',
      'paymentStatus'
    );
    // return queryInterface.removeColumn(
    //   'Users', // name of Source model
    //   'teamId' // key we want to remove
    // ).then(() => {
    //   return queryInterface.removeColumn(
    //     'Users',
    //     'paymentStatus'
    //   );
    // });
  }
};
