const router = require('express').Router();
const { User, Spell, UserSpell } = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');
const { QueryTypes } = require('sequelize');
const axios = require('axios');

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
    if (user.spellbook == null) {
      res.redirect('/all');
      return;
    }
    const spellBookIds = user.spellbook.split(',');
    Spell.findAll({
      where: {id: spellBookIds},
      raw: true
    })
    .then((userSpells) => {
      user.spells = userSpells; 
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
    // const allClassSpells = await sequelize.query(
    //   'SELECT * FROM spellbook_db.spell WHERE class LIKE :search_class', {
    //     replacements: { search_class: `%wizard%`},
    //     type: QueryTypes.SELECT,
    //     raw: true,
    // });
    const allClassSpells = await axios.get('https://mydndspellbook.herokuapp.com/api/spells/all/wizard')
      .then(function (res) {
        return res;
      })
      .catch(function (err) {
        res.status(404).json(err).redirect('/all');
        return;
      });
    // const spell = allClassSpells[0];
    const spells = allClassSpells.data;
    // console.log(spells);
    // console.log("Here is the console" + spells);
    // const updatedSpells = await spells.map((spell)=>{
    //   spell.desc = spell.desc.replace(new RegExp('<p>', 'g'),"");
    //   spell.desc = spell.desc.replace(new RegExp('</p>', 'g'),"");
    //   if (spells.higher_level != null) {
    //     spell.higher_level = spell.higher_level.toString();
    //     spell.higher_level = spell.higher_level.replace(new RegExp('<p>', 'g'),"");
    //     spell.higher_level = spell.higher_level.replace(new RegExp('</p>', 'g'),"");
    //   };
    //   return spell;
    // });
    res.render('spells', {
    spells,
    logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json();
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.status(204).redirect("/");
      });
  } else {
      res.status(404).end();
  }
});

module.exports = router;