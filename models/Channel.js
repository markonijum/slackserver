export default (sequelize, DataTypes) => {
    var Channel = sequelize.define('Channel', {
      name: DataTypes.STRING,
      public: DataTypes.BOOLEAN
    });
  
    Channel.associate = function (models) {
      Channel.belongsTo(models.Team, {
        foreignKey: 'team_id'
      });
      Channel.belongsToMany(models.User, {
        through: 'channel_member',
        foreignKey: 'channel_id'
      });
    };
  
    return Channel;
  };