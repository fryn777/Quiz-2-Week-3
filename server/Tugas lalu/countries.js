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

app.get('/api/countrie',(req,res)=>{
    pool.query('select * from countries',
    [],
    (error,result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/countrie/:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from countries where country_id = $1',
    [id],
    (error,result)=>{
        if(error){
        throw error;
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/countrie/',(req,res)=>{
    const {id,name,reg_id} = req.body
    pool.query('insert into countries (country_id,country_name,region_id) values ($1,$2,$3)',
    [id,name,reg_id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})


app.put('/api/countrie/:id',(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    pool.query("update countries set country_name=$1 where country_id=$2",
    [name,id],
    (error,result) =>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})

app.delete('/api/countrie/:id',(req,res)=>{
    const {id} = req.params
    pool.query('delete from countries where country_id = $1',
    [id],
    (error,result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rowCount)
    })
})





