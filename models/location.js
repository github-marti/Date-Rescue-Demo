module.exports = function(sequelize, DataTypes) {
    let Location = sequelize.define("Location", {
      location_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location_state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location_zip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      angel_shot: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location_like: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location_dislike: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }},
      {timestamps: false
      });
      return Location
    }