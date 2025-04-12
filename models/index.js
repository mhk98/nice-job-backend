// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

// Define models
db.user = require("../app/modules/user/user.model")(db.sequelize, DataTypes);
db.profile = require("../app/modules/profile/profile.model")(db.sequelize, DataTypes);
db.jobPost = require("../app/modules/jobPost/jobPost.model")(db.sequelize, DataTypes);
db.appliedJob = require("../app/modules/appliedJob/appliedJob.model")(db.sequelize, DataTypes);
db.jobCategory = require("../app/modules/jobCategory/jobCategory.model")(db.sequelize, DataTypes);



//Realtion for product table

db.jobCategory.hasMany(db.jobPost, { foreignKey: "category_id" });
db.jobPost.belongsTo(db.jobCategory, { foreignKey: "category_id" });

// db.jobCategory.hasMany(db.profile, { foreignKey: "category_id" });
// db.profile.belongsTo(db.jobCategory, { foreignKey: "category_id" });

db.user.hasMany(db.profile, { foreignKey: "user_id" });
db.profile.belongsTo(db.user, { foreignKey: "user_id" });

db.user.hasMany(db.appliedJob, { foreignKey: "user_id" });
db.appliedJob.belongsTo(db.user, { foreignKey: "user_id" });

db.jobPost.hasMany(db.appliedJob, { foreignKey: "jobPost_id" });
db.appliedJob.belongsTo(db.jobPost, { foreignKey: "jobPost_id" });

db.user.hasMany(db.jobPost, { foreignKey: "user_id" });
db.jobPost.belongsTo(db.user, { foreignKey: "user_id" });







// Sync the database
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection re-synced successfully");
  })
  .catch((err) => {
    console.error("Error on re-sync:", err);
  });

module.exports = db;
