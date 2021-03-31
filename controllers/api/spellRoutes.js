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
    const updatedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id/add', async (req, res) => {
  try {
    const addSpell = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    const spellID = req.body.spellbook;
    if (!addSpell) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const spellsSTR = addSpell.spellbook;
    if (spellsSTR != null) {
      if (spellsSTR.includes(parseInt(spellID))) {
       res.status(409).json({ message: 'Spellbook already includes this spell for this user!'})
       return;
      } else {
        const spellIDS = spellsSTR.split(',').map(Number);
        spellIDS.push(parseInt(spellID));
        const newspellIDS = spellIDS.join();
        await User.update({ spellbook: newspellIDS }, {
          where: {
            id: req.params.id,
          },
        });
      }
    } else {
      await User.update({ spellbook: spellID }, {
        where: {
          id: req.params.id,
        },
      });
    }
    const updatedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id/remove', async (req, res) => {
  try {
    const deleteSpell = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteSpell) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const spellsSTR = deleteSpell.spellbook;
    if (spellsSTR == null) {
      res.status(404).json({ message: 'No spellbook found with this user id!' })
      return;
    }
    const spellID = req.body.spellbook;
    const spellIDS = spellsSTR.split(',').map(Number);
    const index = spellIDS.indexOf(parseInt(spellID));
    if (index > -1) {
      spellIDS.splice(index, 1);
    } else {
      res.status(404).json({ message: `This spell doesn't exist in this user's spellbook!` });
      return;
    }
    const newSpellIDS = spellIDS.join();
    await User.update({ spellbook: newSpellIDS }, {
      where: {
        id: req.params.id,
      },
    });
    const updatedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
