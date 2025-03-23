const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      
      Email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
    

      role: {
        type: DataTypes.STRING,
        defaultValue: "candidate",
        validate: {
          isIn: [['candidate', 'employer']],
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.Password) {
            const salt = await bcrypt.genSalt(10);
            user.Password = bcrypt.hashSync(user.Password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('Password') && user.Password) {
            const salt = await bcrypt.genSalt(10);
            user.Password = bcrypt.hashSync(user.Password, salt);
          }
        },
      },
    }
  );

  User.prototype.validPassword = async function(Password) {
    return await bcrypt.compare(Password, this.Password);
  };

  return User;
};
