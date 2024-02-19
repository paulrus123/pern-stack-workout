module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
    session_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    session_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sessions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sessions_pkey",
        unique: true,
        fields: [
          { name: "session_id" },
        ]
      },
    ]
  });
};
