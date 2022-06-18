const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emplo_proj', {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'employee_id'
      }
    },
    proj_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'proj_id'
      }
    },
    name_employees: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    project_employees: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'emplo_proj',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employees_project",
        unique: true,
        fields: [
          { name: "employee_id" },
          { name: "proj_id" },
        ]
      },
    ]
  });
};
