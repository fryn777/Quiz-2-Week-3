import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const countrie = await req.context.models.countries.findAll({
            include : [{
                model : req.context.models.locations,
                as : "locations",
                right : true
            }]
        })
        return res.send(countrie)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req,res)=>{
    try {
        const countrie = await req.context.models.countries.findOne({
            where:{country_id : req.params.id}
        })
        return res.send(countrie)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    const cekReg = req.regions
    try {
        const countrie = await req.context.models.countries.create({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : cekReg.region_id
        })
        return res.send(countrie)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createNext = async (req,res,next)=>{
    try {
        const countrie = await req.context.models.countries.create({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : req.body.region_id
        })
        req.countries = countrie
        next()
    } catch (error) {
        return res.status(404).send(error)
    }
}


const update = async (req,res)=>{
    try {
        const countrie = await req.context.models.countries.update({
            country_id : req.body.country_id,
            country_name : req.body.country_name,
            region_id : req.body.region_id
        },{ returning : true , where:{country_id : req.params.id}})
        return res.send(countrie)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const countrie = await req.context.models.countries.destroy({
            where:{country_id : req.params.id}
        })
        return res.send('delete '+countrie+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

//Query Join
const querySQL = async(req,res)=>{
    try {
        await sequelize.query(`SELECT *,region_id,region_name from countries
         JOIN regions USING (region_id) where region_id = :countryId`,
        {replacements : {countryId : req.params.id},type : sequelize.QueryTypes.SELECT})
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