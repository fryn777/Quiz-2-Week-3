import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.EmployeeCtrl.findAll)
router.get('/:id',indexCtrl.EmployeeCtrl.findOne)
router.post('/',indexCtrl.EmployeeCtrl.create)
router.put('/:id',indexCtrl.EmployeeCtrl.update)
router.delete('/:id',indexCtrl.EmployeeCtrl.deleted)
router.get ('/sql/:id',indexCtrl.EmployeeCtrl.querySQL)
export default router