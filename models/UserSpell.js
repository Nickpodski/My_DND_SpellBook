const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class UserSpell extends Model {}

// create fields/columns for Trip model
UserSpell.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    spell_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'spell',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userspell'
  }
);

module.exports = UserSpell;
