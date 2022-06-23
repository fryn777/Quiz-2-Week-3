import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.findAll({
            include : [{
               all : true
            }]
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.findOne({
            where:{employee_id : req.params.id}
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    const cekJob = req.jobs
    const cekDep = req.departments
    try {
        const employee = await req.context.models.employees.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : cekJob.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : cekDep.department_id,
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createArray = async (req,res)=>{
    const {files,fields} = req.fileAttrb
    try {
        const employee = await req.context.models.employees.create({
            first_name : fields[0].value,
            last_name : fields[1].value,
            email : fields[2].value,
            phone_number : fields[3].value,
            hire_date : new Date(),
            job_id : parseInt(fields[4].value),
            salary : fields[5].value,
            manager_id : parseInt(fields[6].value),
            department_id : parseInt(fields[7].value),
            emp_profile : files[0].file.newFilename
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createJobEmplo = async (req,res)=>{
    const cekJob = req.jobs
    try {
        const employee = await req.context.models.employees.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : cekJob.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id,
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createDepartEmplo = async (req,res)=>{
    const cekDep = req.departments
    try {
        const employee = await req.context.models.employees.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : cekDep.department_id,
  
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createNext = async (req,res,next)=>{
    const cekDepart = req.departments
    try {
        const employee = await req.context.models.employees.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id,
    
        })
        req.employees = employee
        next()
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.update({
            employee_id : req.body.employee_id,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id
        },{ returning : true , where:{department_id : req.params.id}})
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const employee = await req.context.models.employees.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+employee+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

//Query Join
const querySQL = async(req,res)=>{
    try {
        await sequelize.query(`SELECT *,department_name from employees
         JOIN departments USING (department_id) where employee_id = :employeeId`,
        {replacements : {employeeId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findOne,
    create,
    createNext,
    createJobEmplo,
    createDepartEmplo,
    createArray,
    update,
    deleted,
    querySQL
}