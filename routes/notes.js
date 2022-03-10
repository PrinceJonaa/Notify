import { Router } from 'express';
import * as notesCtrl from '../controllers/notes.js';
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

router.get('/', notesCtrl.index);
router.get('/new', isLoggedIn, notesCtrl.new);
router.delete("/:id", notesCtrl.delete);
router.post("/", isLoggedIn, notesCtrl.create);
router.get('/:id', notesCtrl.show);


export {
  router
}