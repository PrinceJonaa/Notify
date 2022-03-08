import { Router } from 'express';
import * as notesCtrl from '../controllers/notes.js';
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

router.get('/', notesCtrl.index);
router.get("/:id", notesCtrl.show);
router.post("/", isLoggedIn, notesCtrl.create);


export {
  router
}