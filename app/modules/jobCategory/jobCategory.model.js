module.exports = (sequelize, DataTypes) => {
    const JobCategory = sequelize.define(
      "JobCategory",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
      
    );
  
    return JobCategory;
  };