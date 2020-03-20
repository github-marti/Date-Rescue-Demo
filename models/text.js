module.exports = function (sequelize, DataTypes) {
  let Text = sequelize.define("Text", {
    text_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    text_message: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  });

  Text.associate = function (models) {
    Text.belongsTo(models.Event, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Text;
};