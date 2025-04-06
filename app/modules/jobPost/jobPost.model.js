module.exports = (sequelize, DataTypes) => {
    const JobPost = sequelize.define(
      "JobPost",
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
        tags: {
          type: DataTypes.TEXT,
          allowNull: false,
          get() {
            return this.getDataValue("tags") ? JSON.parse(this.getDataValue("tags")) : [];
          },
          set(value) {
            this.setDataValue("tags", JSON.stringify(value));
          },
        },
        
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        experience: {
        type: DataTypes.STRING,
          allowNull: false,
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
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
  
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      
    );
  
    return JobPost;
  };