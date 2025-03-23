// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

// Define models
db.user = require("../app/modules/user/user.model")(db.sequelize, DataTypes);
db.product = require("../app/modules/product/product.model")(db.sequelize, DataTypes);
db.jobPost = require("../app/modules/jobPost/jobPost.model")(db.sequelize, DataTypes);



//Realtion for product table

// db.user.hasMany(db.order, { foreignKey: "user_id" });
// db.order.belongsTo(db.user, { foreignKey: "user_id" });

// db.user.hasMany(db.cart, { foreignKey: "user_id" });
// db.cart.belongsTo(db.user, { foreignKey: "user_id" });







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
