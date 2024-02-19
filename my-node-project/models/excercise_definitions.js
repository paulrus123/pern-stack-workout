module.exports = function(sequelize, DataTypes) {
  return sequelize.define('excercise_definitions', {
    excercise_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    excercise_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    excercise_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'excercise_definitions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "excercise_definitions_pkey",
        unique: true,
        fields: [
          { name: "excercise_id" },
        ]
      },
    ]
  });
};
