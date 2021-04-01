const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userSpells = require('./userSpellRoutes');
const spells = require('./spellRoutes');

router.use('/users', userRoutes);
router.use('/spellbooks', userSpells);
router.use('/spells', spells);

module.exports = router;
