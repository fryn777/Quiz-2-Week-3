import Sequelize from "sequelize";
import config from "../../config/config";

const sequelize = new Sequelize(
config.db_name,
config.db_username,
config.db_password,

{

  dialect : 'postgres',
  pool : {
    max : 5,
    min : 0,
    acquire : 3000,
    idle : 10000
  }
}

)

const DataTypes = require("sequelize").DataTypes;
const _countries = require("./countries");
const _departments = require("./departments");
const _dependents = require("./dependents");
const _emplo_proj = require("./emplo_proj");
const _employees = require("./employees");
const _jobs = require("./jobs");
const _locations = require("./locations");
const _project_assignment = require("./project_assignment");
const _projects = require("./projects");
const _regions = require("./regions");

function initModels(sequelize) {
  const countries = _countries(sequelize, DataTypes);
  const departments = _departments(sequelize, DataTypes);
  const dependents = _dependents(sequelize, DataTypes);
  const emplo_proj = _emplo_proj(sequelize, DataTypes);
  const employees = _employees(sequelize, DataTypes);
  const jobs = _jobs(sequelize, DataTypes);
  const locations = _locations(sequelize, DataTypes);
  const project_assignment = _project_assignment(sequelize, DataTypes);
  const projects = _projects(sequelize, DataTypes);
  const regions = _regions(sequelize, DataTypes);

  employees.belongsToMany(projects, { as: 'proj_id_projects', through: emplo_proj, foreignKey: "employee_id", otherKey: "proj_id" });
  employees.belongsToMany(projects, { as: 'pras_proj_id_projects', through: project_assignment, foreignKey: "pras_employee_id", otherKey: "pras_proj_id" });
  projects.belongsToMany(employees, { as: 'employee_id_employees', through: emplo_proj, foreignKey: "proj_id", otherKey: "employee_id" });
  projects.belongsToMany(employees, { as: 'pras_employee_id_employees', through: project_assignment, foreignKey: "pras_proj_id", otherKey: "pras_employee_id" });
  locations.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(locations, { as: "locations", foreignKey: "country_id"});
  employees.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(employees, { as: "employees", foreignKey: "department_id"});
  dependents.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(dependents, { as: "dependents", foreignKey: "employee_id"});
  emplo_proj.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(emplo_proj, { as: "emplo_projs", foreignKey: "employee_id"});
  project_assignment.belongsTo(employees, { as: "pras_employee", foreignKey: "pras_employee_id"});
  employees.hasMany(project_assignment, { as: "project_assignments", foreignKey: "pras_employee_id"});
  employees.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(employees, { as: "employees", foreignKey: "job_id"});
  departments.belongsTo(locations, { as: "location", foreignKey: "location_id"});
  locations.hasMany(departments, { as: "departments", foreignKey: "location_id"});
  emplo_proj.belongsTo(projects, { as: "proj", foreignKey: "proj_id"});
  projects.hasMany(emplo_proj, { as: "emplo_projs", foreignKey: "proj_id"});
  project_assignment.belongsTo(projects, { as: "pras_proj", foreignKey: "pras_proj_id"});
  projects.hasMany(project_assignment, { as: "project_assignments", foreignKey: "pras_proj_id"});
  countries.belongsTo(regions, { as: "region", foreignKey: "region_id"});
  regions.hasMany(countries, { as: "countries", foreignKey: "region_id"});

  return {
    countries,
    departments,
    dependents,
    emplo_proj,
    employees,
    jobs,
    locations,
    project_assignment,
    projects,
    regions,
  };
}

const models = initModels(sequelize);
export default models
export {sequelize}
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
