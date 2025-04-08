const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Profile = sequelize.define("Profile", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentSalary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expectedSalary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    employmentHistory: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      get() {
        try {
          return JSON.parse(this.getDataValue("employmentHistory")) || [];
        } catch (error) {
          return [];
        }
      },
      set(value) {
        // Ensure the value is an array of objects with the required structure
        if (Array.isArray(value)) {
          const formattedEmploymentHistory = value.map((item) => ({
            jobTitle: item.jobTitle || "",
            companyName: item.companyName || "",
            startDate: item.startDate || null,
            endDate: item.endDate || null,
          }));
          this.setDataValue("employmentHistory", JSON.stringify(formattedEmploymentHistory));
        } else {
          this.setDataValue("employmentHistory", JSON.stringify([]));
        }
      },
    },
    educationHistory: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      get() {
        try {
          return JSON.parse(this.getDataValue("educationHistory")) || [];
        } catch (error) {
          return [];
        }
      },
      set(value) {
        // Ensure the value is an array of objects with the required structure
        if (Array.isArray(value)) {
          const formattedEducationHistory = value.map((item) => ({
            degree: item.degree || "",
            institution: item.institution || "",
            graduationYear: item.graduationYear || null,
            CGPA: item.CGPA || null,
          }));
          this.setDataValue("educationHistory", JSON.stringify(formattedEducationHistory));
        } else {
          this.setDataValue("educationHistory", JSON.stringify([]));
        }
      },
    },
    // educationHistory: {
    //   type: DataTypes.JSON,
    //   allowNull: false,
    //   defaultValue: [],
    // },


   
    skills: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
      get() {
        try {
          return JSON.parse(this.getDataValue("skills")) || [];
        } catch (error) {
          return [];
        }
      },
      set(value) {
        this.setDataValue("skills", JSON.stringify(value));
      },
    },
    languages: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "[]",
      get() {
        try {
          return JSON.parse(this.getDataValue("languages")) || [];
        } catch (error) {
          return [];
        }
      },
      set(value) {
        this.setDataValue("languages", JSON.stringify(value));
      },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    headline: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // Store image URL/path
      allowNull: false,
    },
  });

  return Profile;
};
