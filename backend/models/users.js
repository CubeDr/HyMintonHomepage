'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    ID: {
        type: DataTypes.STRING,
        allowNull: false
      },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
      },
    lname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DID:{
      type: DataTypes.STRING,
      allowNull: false
    },
    salt:{
        type: DataTypes.STRING
      }
  });
 
  return user;
};
