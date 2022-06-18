import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.CountrieCtrl.findAll)
router.get('/:id',indexCtrl.CountrieCtrl.findOne)
router.post('/',indexCtrl.CountrieCtrl.create)
router.put('/:id',indexCtrl.CountrieCtrl.update)
router.delete('/:id',indexCtrl.CountrieCtrl.deleted)
router.get ('/sql/:id',indexCtrl.CountrieCtrl.querySQL)
export default router