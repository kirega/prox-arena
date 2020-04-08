const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('teams', 'teamsAdmin', 'myPass', {
    dialect: 'sqlite',
    storage: './team-battles',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// models
class User extends Model { }

User.init(
    {
        // attributes
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING
            // allo,wNull defaults to true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        her: {
            type: Sequelize.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'user'

    }
);
class Team extends Model { }

Team.init(
    {
        teamName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        totalElos: {
            type: Sequelize.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'team'
    }
);

// Foreign Keys
Team.hasMany(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE'});
User.belongsTo(Team , { foreignKey: { allowNull: false }, onDelete: 'CASCADE'});

class Account extends Model {}

Account.init({
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  permission: {
    type: Sequelize.STRING,
    defaultValue: 'ADMIN'
  }
})

sequelize.sync();

module.exports = { sequelize, user: User, team: Team , account: Account};
