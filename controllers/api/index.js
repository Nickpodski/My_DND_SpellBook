const router = require('express').Router();
const userRoutes = require('./userRoutes');
const addSpell = require('./spellRoutes')

router.use('/users', userRoutes);
router.use('/spells', addSpell)

module.exports = router;
