import { Router } from 'express';
import * as notesCtrl from '../controllers/notes.js';
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

router.get('/', notesCtrl.index);
router.get('/new', isLoggedIn, notesCtrl.new);
router.get('/:id', notesCtrl.show);
router.get("/:id/edit", isLoggedIn, notesCtrl.edit);

router.post("/new", isLoggedIn, notesCtrl.create);

router.post("/:id/comments", isLoggedIn, notesCtrl.createComment);

router.delete("/:id", isLoggedIn, notesCtrl.delete);

router.put('/:id', isLoggedIn, notesCtrl.update)

export {
  router
}