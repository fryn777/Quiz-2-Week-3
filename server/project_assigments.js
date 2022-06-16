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

app.get('/api/projectassigment',(req,res)=>{
    pool.query('select * from project_assigments',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/projectassigment/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from project_assigments where pras_proj_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/projectassigment/',(req,res)=>{
    const {id1,id2,start_date,end_date,status} = req.body
    pool.query('insert into project_assigments (pras_proj_id,pras_employee_id,pras_startdate,pras_enddate,pras_status) values ($1,$2,$3,$4,$5)',
    [id1,id2,start_date,end_date,status],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/projectassigment/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update project_assigments set pras_startdate=$1 where pras_proj_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/projectassigment/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from project_assigments where pras_proj_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})