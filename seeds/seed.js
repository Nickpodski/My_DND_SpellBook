const sequelize = require('../config/connection');
const { User, Spell, UserSpell } = require('../models');
const fs = require('fs');
const path = require('path');
const userData = require('./userData.json');
const spells = require('./spells.json');

const seedDatabase = async () => {

  fs.readFile(path.join(__dirname, './spells.json'), async function (err, spells) {

    const spellsArray = JSON.parse(spells);

    // console.log(spellsArray)

    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Spell.bulkCreate(spellsArray, {
      individualHooks: true,
      returning: true,
    });

    await UserSpell.bulkCreate([
      {
        user_id: 1,
        spell_id: 2
      },
      {
        user_id: 1,
        spell_id: 3
      },
      {
        user_id: 2,
        spell_id: 6
      }
    ],
      {
        individualHooks: true,
        returning: true,
      });

    process.exit(0);
  });

};

seedDatabase();
