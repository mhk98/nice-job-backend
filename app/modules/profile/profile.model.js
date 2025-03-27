const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50], // Minimum 2, Maximum 50 characters
      },
    },
    headline: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marital_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    languages: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        return this.getDataValue("languages") ? JSON.parse(this.getDataValue("languages")) : [];
      },
      set(value) {
        this.setDataValue("languages", JSON.stringify(value));
      },
    },
    current_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expt_salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    skills: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        return this.getDataValue("skills") ? JSON.parse(this.getDataValue("skills")) : [];
      },
      set(value) {
        this.setDataValue("skills", JSON.stringify(value));
      },
    },
    employment: {
      type: DataTypes.JSON, // JSON data type for storing complex data
      allowNull: false,
      defaultValue: {}, // Default value as an empty object
      get() {
          return JSON.parse(this.getDataValue("employment"));
      },
      set(val) {
          this.setDataValue("employment", JSON.stringify(val));
      },
  },
  education: {
      type: DataTypes.JSON, // JSON data type for storing complex data
      allowNull: false,
      defaultValue: {}, // Default value as an empty object
      get() {
          return JSON.parse(this.getDataValue("education"));
      },
      set(val) {
          this.setDataValue("education", JSON.stringify(val));
      },
  },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    
  });

  return Profile;
};
