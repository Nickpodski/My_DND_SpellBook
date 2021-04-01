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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    domains: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    archetype: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    circles: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    oaths: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    higher_level: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    patrons: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    hooks: {
      async beforeCreate(newspellData) {
        if (this.material != undefined) {
          newspellData.material = null;
        }
        if (this.domains != undefined) {
          newspellData.domains = null;
        }
        if (this.archetype != undefined) {
          newspellData.archetype = null;
        }
        if (this.circles != undefined) {
          newspellData.circles = null;
        }
        if (this.oaths != undefined) {
          newspellData.oaths = null;
        }
        if (this.higher_level != undefined) {
          newspellData.higher_level = null;
        }
        if (this.patrons != undefined) {
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
