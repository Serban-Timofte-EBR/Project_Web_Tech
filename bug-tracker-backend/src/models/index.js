const User = require("./user");
const Team = require("./team");
const TeamMember = require("./teamMember");

// Define relationships
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

module.exports = {
  User,
  Team,
  TeamMember,
};
