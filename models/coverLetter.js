module.exports = (sequelize, DataTypes) => {
    const CoverLetter = sequelize.define('CoverLetter', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      jobPostingId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    });
  
    CoverLetter.associate = (models) => {
      CoverLetter.belongsTo(models.User);
      CoverLetter.belongsTo(models.JobPosting);
    };
  
    return CoverLetter;
  };