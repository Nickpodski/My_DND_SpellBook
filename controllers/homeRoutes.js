const router = require('express').Router();
const { User, Spell, UserSpell } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // const userData = await Spell.findAll({});
    // const users = userData.map((project) => project.get({ plain: true }));
    //DEBUG BELOW!
    // console.log(users)
    // console.log(userData);
    // res.json(userData)
    const userData = await User.findOne({
      where: {
        id: req.session.user_id
      }
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('homepage', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/', withAuth, async (req, res) => {
      // res.json(userData);
  //  BELOW IS WHAT WE WANT TO RENDER!!!!
//    res.render('homepage', {
      // users.spells,
//      logged_in: req.session.logged_in,
//    });
//  } catch (err) {
//    res.status(500).json(err);
// });

router.get('/all', withAuth, async (req, res) => {
  try {
    // const userData = await Spell.findAll({});
    // const users = userData.map((project) => project.get({ plain: true }));
    //DEBUG BELOW!
    // console.log(users)
    // console.log(userData);
    // res.json(userData)
      res.render('spells', {
      users,
      logged_in: req.session.logged_in,
    });
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
