// connect to database
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Sequelize } = require("sequelize");
require('dotenv').config();
// const sequelize = new Sequelize(
//   "fishnmeatdb",   // DB_NAME
//   "fishnmeat",     // DB_USER
//   "Fishnmeat@123",  // DB_PASSWORD

//   // "nurtajdb", 
//   // "root", 
//   // "",      
//   {
//     // host: "139.162.4.103", // DB_HOST
//     host: "localhost", // DB_HOST
//     dialect: "mysql",
//     pool: {
//       max: 10,
//       min: 0,
//       idle: 10000,
//       acquire: 30000, // Add acquire timeout (default 60s)
//     },
//     logging: false,
//     timezone: "+06:00", // Timezone
//     port: 3306, // MySQL default port
//   }
// );



const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,

  // 'sql12772137', // Replace with your actual database name
  // 'sql12772137', // Replace with your actual database user
  // 'uIMTXIAnJR', // Replace with your actual database password
  {
      // host:'82.112.226.90',
      
    // host: "sql.freedb.tech",
    // host: "sql12.freesqldatabase.com",
    // host:"mysql-34ea360f-mohsinkabirseo-6632.i.aivencloud.com",
    host:process.env.DB_HOST,
    dialect: "mysql",
    pool: { max: 5, min: 0, idle: 10000 },
    logging: false,
    timezone: "+06:00",
    port: 3306
    // port:25958
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
