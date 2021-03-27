const router = require('express').Router();
const { User, Spell, UserSpell } = require('../models');
// const { Spell } = require('../models');
const withAuth = require('../utils/auth');
// put back auth
router.get('/', async (req, res) => {
  try {
    // const userData = await User.findByPk(req.session.user_id, {
    //   include: [{ model: Spell, through: UserSpell }]
    // });
    console.log(req.session.user_id)
    const userData = await User.findAll({
      include: [{model: Spell, through: UserSpell}]
    });

    // const users = userData.get({ plain: true });

    // console.log(users)
    // console.log(userData);
      res.json(userData);
    // res.render('homepage', {
    //   // users.spells,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});
// add auth
router.get('/all', async (req, res) => {
  try {
    const userData = await UserSpell.findAll({});

    const users = userData.map((project) => project.get({ plain: true }));

    // console.log(users)
    // console.log(userData);
    res.json(userData)
;    // res.render('homepage', {
    //   users,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
