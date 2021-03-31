const router = require('express').Router();
const { UserSpell, User, Spell } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
router.post('/', async (req, res) => {
  try {
    const newUserSpell = await UserSpell.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newUserSpell);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const getSpells = await User.findOne({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });
    if (!getSpells) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const spellsSTR = getSpells.spellbook;
    if (!spellsSTR) {
      res.status(404).json({ message: 'No spellbook found with this id!' });
      return;
    }
    const spellIDS = spellsSTR.split(',').map(Number);
    const findSpells = await Spell.findAll({
      where: {
        id: spellIDS,
      }
    })
    res.status(200).json(findSpells);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const addSpell = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    const spellID = req.body.spellbook;
    if (!addSpell) {
      res.status(404).json({message: 'No user found with this id!'});
      return;
    }
    const spellsSTR = addSpell.spellbook;
    if (spellsSTR != null) {
      const spellIDS = spellsSTR.split(',').map(Number);
      spellIDS.push(parseInt(spellID));
      console.log(spellIDS);
      const newspellIDS = spellIDS.join();
      await User.update( {spellbook: newspellIDS},{
        where: {
          id: req.params.id,
        },
      });
    } else {
      const spellIDS = spellsSTR.split(',').map(Number);
      const newSpell = spellIDS.join();
      await User.update( {spellbook: newSpell},{
        where: {
          id: req.params.id,
        },
      });
    }
    res.status(200).json(addSpell);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:id/:spell', async (req, res) => {
//   try {
//     const getSpell = await User.findOne({
//       where: {
//         id: req.params.id,
//         // user_id: req.session.user_id,
//       },
//     });
//     if (!getSpell) {
//       res.status(404).json({ message: 'No user found with this id!' });
//       return;
//     }
//     const spellsSTR = getSpell.spellbook;
//     const spellIDS = spellsSTR.split(',').map(Number);
//     this.spell = params.get('spell');
//     const spell = spellIDS[this.spell];
//     const findSpell = await Spell.findOne({
//       where: {
//         id: spell,
//       }
//     })
//     res.status(200).json(findSpell);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
