const User = require('./User');
const Spell = require('./Spell');
const UserSpell = require('./UserSpell');


Spell.belongsToMany(User, { 
    through: UserSpell,
    foreignKey: 'spell_id'});

User.belongsToMany(Spell, { 
    through: UserSpell,
    foreignKey: 'user_id'});

module.exports = { User, Spell, UserSpell };
