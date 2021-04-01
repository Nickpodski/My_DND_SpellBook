const router = require('express').Router();
const { User, Spell } = require('../../models');
const { sequelize } = require('../../models/User');
const { QueryTypes } = require('sequelize');
const withAuth = require('../../utils/auth');


// find spell by name
router.get('/:name', async (req, res) => {
  try {
    const getSpell = await Spell.findOne({
      where: {
        name: req.params.name,
        // user_id: req.session.user_id,
      },
    });
    if (!getSpell) {
      res.status(404).json({ message: 'No spell found with this name!' });
      return;
    }
    res.status(200).json(getSpell);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all class spells currently. Currently let's limit to wizard.
// localhost:3001/api/spells/all/wizard
router.get('/all/:spellClass', async (req, res) => {
  try {
    const {spellClass} = req.params;
    console.log(spellClass);
    const allClassSpells = await sequelize.query(
      'SELECT * FROM spellbook_db.spell WHERE class LIKE :search_class', {
        replacements: { search_class: `%${spellClass}%`},
        type: QueryTypes.SELECT
    });
    if (allClassSpells == []) {
      res.status(404).json({ message: 'No spells found with this class!' });
      return;
    };
    res.status(200).json(allClassSpells);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;