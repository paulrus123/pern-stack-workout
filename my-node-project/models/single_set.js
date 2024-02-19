module.exports = function(sequelize, DataTypes) {
  return sequelize.define('single_set', {
    set_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    excercise_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    num_reps: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'single_set',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "single_set_pkey",
        unique: true,
        fields: [
          { name: "set_id" },
        ]
      },
    ]
  });
};
