module.exports = (sequelize, DataTypes) => {
    const JobPosting = sequelize.define('JobPosting', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      requirements: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    JobPosting.associate = (models) => {
      JobPosting.belongsTo(models.User, { as: 'creator' });
    };
  
    return JobPosting;
  };