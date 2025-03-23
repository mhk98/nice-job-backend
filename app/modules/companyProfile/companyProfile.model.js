const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CompanyProfile = sequelize.define('CompanyProfile', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    headline: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    marital_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    current_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expt_salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    skill: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
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
      allowNull: true,
    },
    
    
  });

  return CompanyProfile;
};
