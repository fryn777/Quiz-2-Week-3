const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_assignment', {
    pras_proj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'proj_id'
      }
    },
    pras_employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    },
    pras_startdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pras_enddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pras_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'project_assignment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ID_PKEY",
        unique: true,
        fields: [
          { name: "pras_proj_id" },
          { name: "pras_employee_id" },
        ]
      },
    ]
  });
};
