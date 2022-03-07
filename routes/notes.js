import { Router } from 'express';
import * as notesCtrl from '../controllers/notes.js';

const router = Router();

router.get('/', notesCtrl.index);

export {
  router
}