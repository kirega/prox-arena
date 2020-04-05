var Sequelize =  require('../db/db');
const Model = Sequelize.Model;
class User extends Model {}

User.init({
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  Sequelize,
  modelName: 'user'
  // options
});

User.sync().then(() => {
    return User.create({
        firstName: "joe",
        lastName: "Hancok"
    });
});