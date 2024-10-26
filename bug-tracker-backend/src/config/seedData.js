const { Team } = require("../models");

const teams = [
  {
    name: "Web Development Team",
    description: "Frontend and Backend development team",
    repository: "https://github.com/org/web-project",
  },
  {
    name: "Mobile Development Team",
    description: "iOS and Android development team",
    repository: "https://github.com/org/mobile-project",
  },
  {
    name: "DevOps Team",
    description: "Infrastructure and deployment team",
    repository: "https://github.com/org/devops-project",
  },
  {
    name: "QA Team",
    description: "Quality Assurance and Testing team",
    repository: "https://github.com/org/qa-project",
  },
];

const seedTeams = async () => {
  try {
    for (const team of teams) {
      await Team.findOrCreate({
        where: { name: team.name },
        defaults: team,
      });
    }
    console.log("Teams seeded successfully");
  } catch (error) {
    console.error("Error seeding teams:", error);
  }
};

module.exports = { seedTeams };
