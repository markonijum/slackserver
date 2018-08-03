export default (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
      text: {
          type: DataTypes.STRING,
      },
    });
  
    Message.associate = function (models) {
      Message.belongsTo(models.Channel, {
        foreignKey: 'channel_id'
      });
     Message.belongsTo(models.User, {
          foreignKey: 'user_id'
      })
    };
  
    return Message;
  };