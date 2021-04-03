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
    const allClassSpells = await sequelize.query(
      'SELECT * FROM cx389k3qd04dh9fh.spell WHERE class LIKE :search_class', {
        replacements: { search_class: '%' + spellClass + '%'},
        type: QueryTypes.SELECT
    });
    // Future figure out how to add an error for incorrect class search.
    if (allClassSpells.length === 0) {
      res.status(404).json({ message: 'No spells found with this class!' });
      return;
    };
    res.status(200).json(allClassSpells);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all spells based on spelllevel. 
// localhost:3001/api/spells/spelllevel/cantrip
router.get('/spelllevel/:level', async (req, res) => {
  try {
    const {level} = req.params;
    const allClassSpells = await sequelize.query(
      'SELECT * FROM cx389k3qd04dh9fh.spell WHERE level LIKE :search_level', {
        replacements: { search_level: `${level}`},
        type: QueryTypes.SELECT
    });
    if (allClassSpells.length === 0) {
      res.status(404).json({ message: 'No spells found with this class!' });
      return;
    };
    res.status(200).json(allClassSpells);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all spells based on casting time.
// localhost:3001/api/spells/castingtime/1_action
router.get('/castingtime/:action', async (req, res) => {
  try {
    const {action} = req.params;
    const actionSTR = action.replace(/_/g, ' ');
    const allSpellCastingTime = await sequelize.query(
      'SELECT * FROM cx389k3qd04dh9fh.spell WHERE casting_time LIKE :search_castingtime', {
        replacements: { search_castingtime: `${actionSTR}`},
        type: QueryTypes.SELECT
    });
    if (allSpellCastingTime.length === 0) {
      res.status(404).json({ message: 'No spells found with this casting time!' });
      return;
    };
    res.status(200).json(allSpellCastingTime);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all spells based on if its a concentration or not.
// localhost:3001/api/spells/concentration/yes
router.get('/concentration/:search', async (req, res) => {
  try {
    const {search} = req.params;
    const isConcentration = await sequelize.query(
      'SELECT * FROM cx389k3qd04dh9fh.spell WHERE concentration LIKE :search_concentration', {
        replacements: { search_concentration: `${search}`},
        type: QueryTypes.SELECT
    });
    if (isConcentration.length === 0) {
      res.status(404).json({ message: 'This search only accepts yes or no!' });
      return;
    };
    res.status(200).json(isConcentration);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all spells based on if its a ritual or not.
// localhost:3001/api/spells/ritual/yes
router.get('/ritual/:search', async (req, res) => {
  try {
    const {search} = req.params;
    const isRitual = await sequelize.query(
      'SELECT * FROM cx389k3qd04dh9fh.spell WHERE ritual LIKE :search_ritual', {
        replacements: { search_ritual: `${search}`},
        type: QueryTypes.SELECT
    });
    if (isRitual.length === 0) {
      res.status(404).json({ message: 'This search only accepts yes or no!' });
      return;
    };
    res.status(200).json(isRitual);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;