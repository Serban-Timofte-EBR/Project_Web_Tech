const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const config = require("../config/config");

const Bug = sequelize.define(
  "Bug",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "teams",
        key: "id",
      },
    },
    reporter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    assignee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
    },
    severity: {
      type: DataTypes.ENUM,
      values: Object.values(config.bugSeverity),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        len: [1, 1000],
      },
    },
    commit_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(config.bugStatus),
      defaultValue: config.bugStatus.OPEN,
      defaultValue: config.bugStatus.OPEN,
    },
    fix_commit_link: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    tableName: "bugs",
  }
);
module.exports = Bug;
