import { Router } from "express";

import * as questionsCtrl from '../controller/questions.ctrl';

import validRole from '../middleware/validation/role/validRole';
import validQuestion from "../middleware/validation/location/valid.question";

import auth from '../middleware/auth/auth';

import { upload } from '../helper/multer';

const router = Router()

router.get('/questions', questionsCtrl.questions)
router.get('/get/questions', questionsCtrl.questionsSuccess)
router.get('/questions/category/:id', questionsCtrl.questionsCategory)
router.post('/questions', [auth, validRole], upload.single("file"), validQuestion, questionsCtrl.createQuestions)
router.delete('/questions/:id', [auth, validRole], questionsCtrl.removeQuestions)
router.patch('/questions/count/:id', auth, questionsCtrl.gameQuestion)
router.patch('/questions/correct/:id', auth, questionsCtrl.correctQuestion)
router.patch('/questions/:questionId/game/:id', auth, questionsCtrl.generateQuestion)
router.patch('/questions/:id/options', questionsCtrl.generateOption)
router.put('/questions/:id', questionsCtrl.updateQuestion)

export default router