const router = require('express').Router();
const { User, Spell, UserSpell } = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');
const { QueryTypes } = require('sequelize');

router.get('/', withAuth, async (req, res) => {
  try {
    // const userData = await Spell.findAll({});
    // const users = userData.map((project) => project.get({ plain: true }));
    //DEBUG BELOW!
    // console.log(users)
    // console.log(userData);
    const userData = await User.findOne({
      where: {
        id: req.session.user_id
      }
    });
    const user = userData.get({ plain: true });

    const spellBookIds = user.spellbook.split(',');

    Spell.findAll({
      where: {id: spellBookIds},
      raw: true
    })
    .then((userSpells) => {
      user.spells = userSpells;

      console.log(user.spells)
      
      res.render('homepage', {
        ...user,
        logged_in: req.session.logged_in,
      });
    })

    
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
    const allClassSpells = await sequelize.query(
      'SELECT * FROM spellbook_db.spell WHERE class LIKE :search_class', {
        replacements: { search_class: `%wizard%`},
        type: QueryTypes.SELECT,
        raw: true,
    });
    // const spell = allClassSpells[0];
    const spells = allClassSpells;
    console.log("Here is the console" + spells);
    const updatedSpells = spells.map((spell)=>{
      spell.desc = spell.desc.replace(new RegExp('<p>', 'g'),"");
      spell.desc = spell.desc.replace(new RegExp('</p>', 'g'),"");
      spell.higher_level = spell.desc.replace(new RegExp('<p>', 'g'),"");
      spell.higher_level = spell.desc.replace(new RegExp('</p>', 'g'),"");
      return spell;
    })
    res.render('spells', {
    updatedSpells,
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