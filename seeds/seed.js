const sequelize = require('../config/connection');
const { User, Spell } = require('../models');

const userData = require('./userData.json');
const spells = require('./spells.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Spell.bulkCreate(spells, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
