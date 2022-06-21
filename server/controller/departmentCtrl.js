import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const department = await req.context.models.departments.findAll({
            include : [{
                model : req.context.models.employees,
                as : "employees",
                left : true
            }]
        })
        return res.send(department)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req,res)=>{
    try {
        const department = await req.context.models.departments.findOne({
            where:{department_id : req.params.id}
        })
        return res.send(department)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    const cekLoc = req.locations
    try {
        const department = await req.context.models.departments.create({
            department_name : req.body.department_name,
            location_id : cekLoc.location_id
        })
        return res.send(department)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createNext = async (req,res,next)=>{
    try {
        const department = await req.context.models.departments.create({
            department_name : req.body.department_name,
            location_id : req.body.location_id
        })
        req.departments = department
        next()
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    try {
        const department = await req.context.models.departments.update({
            department_name : req.body.department_name,
            location_id : req.body.location_id
        },{ returning : true , where:{department_id : req.params.id}})
        return res.send(department)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const department = await req.context.models.departments.destroy({
            where:{department_id : req.params.id}
        })
        return res.send('delete '+department+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

//Query Join
const querySQL = async(req,res)=>{
    try {
        await sequelize.query(`SELECT *,street_address,postal_code,city,country_id from departments
         JOIN locations USING (location_id) where department_id = :departmentId`,
        {replacements : {departmentId : req.params.id},type : sequelize.QueryTypes.SELECT})
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
    update,
    deleted,
    querySQL
}