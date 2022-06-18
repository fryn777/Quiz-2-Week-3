import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.jobCtrl.findAll)
router.get('/:id',indexCtrl.jobCtrl.findOne)
router.post('/',indexCtrl.jobCtrl.create)
router.put('/:id',indexCtrl.jobCtrl.update)
router.delete('/:id',indexCtrl.jobCtrl.deleted)
router.get ('/sql/:id',indexCtrl.jobCtrl.querySQL)
export default router