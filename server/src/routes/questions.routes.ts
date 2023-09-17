import { Router } from "express";

import * as questionsCtrl from '../controller/questions.ctrl';

import validRole from '../middleware/validation/role/validRole';
import validQuestion from "../middleware/validation/location/valid.question";

import auth from '../middleware/auth/auth';

import { upload } from '../helper/multer';

const router = Router()

router.get('/questions', questionsCtrl.questions)
router.post('/questions', upload.single("file"), validQuestion, questionsCtrl.createQuestions)
// router.post('/questions', [auth, validRole], validQuestion, upload.single("file"), questionsCtrl.createQuestions)
// router.delete('/questions/:id', [auth, validRole], questionsCtrl.removeQuestions)
router.delete('/questions/:id', questionsCtrl.removeQuestions)
router.patch('/questions/count/:id', auth, questionsCtrl.gameQuestion)
router.patch('/questions/correct/:id/:gameId', auth, questionsCtrl.correctQuestion)

export default router