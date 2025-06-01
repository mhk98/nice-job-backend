// // connect to database
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { Sequelize } = require("sequelize");
// require('dotenv').config();

// const sequelize = new Sequelize(
//   `${process.env.DB_NAME}`,
//   `${process.env.DB_USER}`,
//   `${process.env.DB_PASSWORD}`,

//   {
//     host:process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "mysql",
//     pool: { max: 5, min: 0, idle: 10000 },
//     logging: false,
//     timezone: "+06:00",


//   }
// );

// // Test the connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error.message);
//     process.exit(1); // Exit the process if DB connection fails
//   });

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// module.exports = db;


// connect to database
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  'freedb_job_db',     // DB name
  'freedb_nicesoftware',     // DB user
  'WB5nyj3@u6pmm@q', // DB password
  {
    host: 'sql.freedb.tech',     // e.g., 'localhost' or remote IP
    port: 3306,               // your DB port, usually 3306 for MySQL
    dialect: "mysql",
    pool: { max: 5, min: 0, idle: 10000 },
    logging: false,
    timezone: "+06:00",       // BD Time
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
    process.exit(1);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
