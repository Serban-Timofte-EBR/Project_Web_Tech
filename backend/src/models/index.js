const User = require("./user");
const Team = require("./team");
const TeamMember = require("./teamMember");
const Bug = require("./bug");

Team.belongsToMany(User, {
  through: TeamMember,
  foreignKey: "team_id",
  otherKey: "user_id",
});

User.belongsToMany(Team, {
  through: TeamMember,
  foreignKey: "user_id",
  otherKey: "team_id",
});

Bug.belongsTo(Team, {
  foreignKey: "team_id",
  onDelete: "CASCADE",
});

Team.hasMany(Bug, {
  foreignKey: "team_id",
});

Bug.belongsTo(User, {
  foreignKey: "reporter_id",
  as: "reporter",
});

Bug.belongsTo(User, {
  foreignKey: "assignee_id",
  as: "assignee",
});

User.hasMany(Bug, {
  foreignKey: "reporter_id",
  as: "reportedBugs",
});

User.hasMany(Bug, {
  foreignKey: "assignee_id",
  as: "assignedBugs",
});

module.exports = {
  User,
  Team,
  TeamMember,
  Bug,
};
