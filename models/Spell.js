const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Spell extends Model {}

Spell.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    page: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    range: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    components: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ritual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concentration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    casting_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    domains: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    archetype: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    circles: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    oaths: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    higher_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patrons: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      async beforeCreate(newspellData) {
        if (!this.material) {
          newspellData.material = null;
        }
        if (!this.domains) {
          newspellData.materials = null;
        }
        if (!this.archetype) {
          newspellData.archetype = null;
        }
        if (!this.circles) {
          newspellData.circles = null;
        }
        if (!this.oaths) {
          newspellData.oaths = null;
        }
        if (!this.higher_level) {
          newspellData.higher_level = null;
        }
        if (!this.patrons) {
          newspellData.patrons = null;
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'spell',
  }
);

module.exports = Spell;
