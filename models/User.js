export default (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
      username: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isAlphanumeric: {
              args: true,
              msg: 'Username muust be alphanumeric'
            },
            len: {
              args: [5,35],
              msg: 'Username must be between 5 and 35 characters long!'
            }
          }
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            len:{
              args: [2,100],
              msg: "Email field is required"
            },
            isEmail: {
              args: true,
              msg: "Email is not Valid!"
            }
          }
      },
      password: {
          type: DataTypes.STRING
      }
    });
  
    User.associate = function (models) {
      User.belongsToMany(models.Team, {
        through: 'members',
        foreignKey: 'user_id'
      });
      User.belongsToMany(models.Channel, {
        through: 'channel_member',
        foreignKey: 'user_id'
      });
    };
  
    return User;
  };