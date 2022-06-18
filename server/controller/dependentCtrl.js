import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const dependent = await req.context.models.dependents.findAll()
        return res.send(dependent)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req,res)=>{
    try {
        const dependent = await req.context.models.dependents.findOne({
            where:{dependent_id : req.params.id}
        })
        return res.send(dependent)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    try {
        const dependent = await req.context.models.dependents.create({
            dependent_id : req.body.dependent_id,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            relationship : req.body.relationship,
            employee_id : req.body.employee_id
            
        })
        return res.send(dependent)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    try {
        const dependent = await req.context.models.dependents.update({
            dependent_id : req.body.dependent_id,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            relationship : req.body.relationship,
            employee_id : req.body.employee_id,
        },{ returning : true , where:{dependent_id : req.params.id}})
        return res.send(dependent)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const dependent = await req.context.models.dependents.destroy({
            where:{dependent_id : req.params.id}
        })
        return res.send('delete '+dependent+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

//Query Join
const querySQL = async(req,res)=>{
    try {
        await sequelize.query(`SELECT *,hire_date,job_id,salary,manager_id from dependents
         JOIN employees USING (employee_id) where dependent_id = :dependent_id`,
        {replacements : {dependent_id : req.params.id},type : sequelize.QueryTypes.SELECT})
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
    update,
    deleted,
    querySQL
}