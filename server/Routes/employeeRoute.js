import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
import UploadDownload from "../../middleware/UploadDownload";

const router = Router()

router.get('/',indexCtrl.EmployeeCtrl.findAll)
router.get('/file/:filename',UploadDownload.showFile)
router.get('/:id',indexCtrl.EmployeeCtrl.findOne)
router.post('/',indexCtrl.EmployeeCtrl.create)
router.post('/next/',indexCtrl.EmployeeCtrl.createNext,indexCtrl.DependentCtrl.create)
router.post('/upload/',UploadDownload.uploadFiles,indexCtrl.EmployeeCtrl.createArray)
router.put('/:id',indexCtrl.EmployeeCtrl.update)
router.delete('/:id',indexCtrl.EmployeeCtrl.deleted)
router.get ('/sql/:id',indexCtrl.EmployeeCtrl.querySQL)
export default router