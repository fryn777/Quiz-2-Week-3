import { on } from "events";
import formidable from "formidable";
import fs from "fs";
import { pipeline } from "stream";

const uploadDir = process.cwd() + '/storages'

const uploadFiles = async (req,res,next) => {

    const options = {
        keepExtensions : true,
        uploadDir : uploadDir,
        maxFile : 5*1024*1024
    }

    const form = formidable(options)
    let files = []
    let fields = []


    form.onPart = function(part){
        if (!part.originalFilename || part.originalFilename.match(/\.(jpg|jpeg|png)$/i)) {
            this._handlePart(part)
            
        } else {
            return res.status(404).send('File Type is not supported')
            
        }
    }

    form.parse(req)
    .on('field',(fieldname,value)=>{
        fields.push({fieldname,value})
    })
    .on('file',(filename,file)=>{
        files.push({filename,file})
    })
    .once('end',()=>{
        console.log('upload done');
        req.fileAttrb = ({
            files : files,
            fields : fields
        })
        next()
    })
    
}

const showFile = async(req,res) => {
    const filename = req.params.filename
    const url = `${process.cwd()}/storages/${filename}`
    fs.createReadStream(url)
    .on('error', ()=>responsetNotFound(req,res))
    .pipe(res)
}

function responsetNotFound(req,res){
    res.writeHead(404,{'Content-Type' : 'text/plain'})
    res.end('not found')
}


export default {
    uploadFiles,
    showFile 
}
