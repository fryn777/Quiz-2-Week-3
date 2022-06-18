import dotenv from "dotenv"
import express from "express"
dotenv.config()

const Pool = require('pg').Pool;
const pool = new Pool({
    host : "localhost",
    user : "postgres",
    password  : "admin",
    database : "postgres",
    port : 5432
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 3003

app.listen(port,()=>{console.log('Server listening on port '+port)})

app.get('/api/employeeproject',(req,res)=>{
    pool.query('select * from emplo_proj',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/employeeproject/:id',(req,res)=>{
    const {id1,id2} = req.params
    pool.query('select * from emplo_proj where employee_id = $1 AND proj_id =$2',
    [id1,id2],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/employeeproject/',(req,res)=>{
    const {emp_id,name_emp,proj_emp,proj_id} = req.body
    pool.query('insert into emplo_proj (employee_id,name_employees,project_employees,proj_id) values ($1,$2,$3,$4)',
    [emp_id,name_emp,proj_emp,proj_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/employeeproject/:id',(req,res)=>{
    const {id1,id2} = req.params
    const {name} = req.body
    pool.query("update emplo_proj set name_project=$1 where employee_id=$2 AND proj_id=$3",
    [name,id1,id2],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/employeeproject/:id',(req,res)=>{
    const {id1,id2} = req.params
    pool.query('delete from emplo_proj where employee_id = $1 AND proj_id=$2',
    [id1,id2],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})


