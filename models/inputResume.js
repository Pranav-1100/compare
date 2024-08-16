module.exports = (sequelize, DataTypes) => {
    const InputResume = sequelize.define('InputResume', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      similarity: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    });
  
    return InputResume;
  };