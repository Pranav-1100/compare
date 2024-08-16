module.exports = (sequelize, DataTypes) => {
    const BaseResume = sequelize.define('BaseResume', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    return BaseResume;
  };