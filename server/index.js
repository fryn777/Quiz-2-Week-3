import 'dotenv/config'
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models,{sequelize} from "./models/init-models";
import routes from './Routes/indexRoute'

const port = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(helmet())
app.use(compress())
app.use(cors())
app.use(async(req,res,next)=> {
    req.context = {models}
    next()
})

app.use('/region',routes.RegRoute)
app.use('/countrie',routes.RegCountrie)
app.use('/department',routes.RegDepartment)
app.use('/location',routes.RegLocation)
app.use('/employee',routes.RegEmployee)
app.use('/job',routes.RegJob)
app.use('/dependent',routes.RegDependent)
const dropDatabaseSync = false

sequelize.sync({force : dropDatabaseSync}).then(async()=>{
    if (dropDatabaseSync) {
        console.log("Database do not drop");
    }
    app.listen(port,()=>{console.log('Server is listening on port '+port)})
})

export default app