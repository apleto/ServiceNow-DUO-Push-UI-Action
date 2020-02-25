// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const pushes = sequelizeClient.define('DUOPushes', {
    affected_user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requested_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duo_device: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preauth_result: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preauth_status_msg: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    auth_result: {
      type: DataTypes.STRING,
      allowNull: true
    },
    auth_status_msg: {
      type: DataTypes.TEXT,
      allowNull: true
    }     
  },{
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  pushes.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return pushes;
};
