module.exports = (sequelize, DataTypes) => {
    const AppliedJob = sequelize.define(
      "AppliedJob",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          companyName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        minSalary: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        maxSalary: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        employmentType: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        profileLocation: {
          type: DataTypes.STRING,
          allowNull: true,
        },

         skills: {
              type: DataTypes.TEXT,
              allowNull: true,
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
      },
      
    );
  
    return AppliedJob;
  };