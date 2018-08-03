export default (sequelize, DataTypes) => {
    var Team = sequelize.define('Team', {
      name: {
          type: DataTypes.STRING,
          unique: true
      },
    });
  
    Team.associate = function (models) {
      Team.belongsToMany(models.User, {
        through: 'members',
        foreignKey: 'team_id'
      });
      Team.belongsTo(models.User, {
          foreignKey: 'owner'
      })
    };
  
    return Team;
  };