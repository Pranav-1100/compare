const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false //console.log
});

// Import models
const User = require('./models/user')(sequelize, DataTypes);
const BaseResume = require('./models/baseResume')(sequelize, DataTypes);
const InputResume = require('./models/inputResume')(sequelize, DataTypes);

// Define associations
User.hasOne(BaseResume);
BaseResume.belongsTo(User);

User.hasMany(InputResume);
InputResume.belongsTo(User);

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
    console.log('Database synchronized and tables created');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  initDatabase,
  User,
  BaseResume,
  InputResume,
  Op: Sequelize.Op
};