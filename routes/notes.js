import { Router } from 'express';
import * as notesCtrl from '../controllers/notes.js';

const router = Router();

router.get('/', notesCtrl.index);
router.get('/create', notesCtrl.create);
router.get("/:id", notesCtrl.show);
router.post("/", notesCtrl.create);


export {
  router
}