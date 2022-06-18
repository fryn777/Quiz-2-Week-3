import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.DependentCtrl.findAll)
router.get('/:id',indexCtrl.DependentCtrl.findOne)
router.post('/',indexCtrl.DependentCtrl.create)
router.put('/:id',indexCtrl.DependentCtrl.update)
router.delete('/:id',indexCtrl.DependentCtrl.deleted)
router.get ('/sql/:id',indexCtrl.DependentCtrl.querySQL)
export default router