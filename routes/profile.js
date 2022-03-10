import { Router } from "express";

router.get("/:id", isLoggedIn, profilesCtrl.show);

const router = Router();

export { router };
