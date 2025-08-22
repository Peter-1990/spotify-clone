import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

//songroute
router.post("/songs",  createSong);
router.delete("/songs/:id",  deleteSong);

//albumroute
router.post("/albums",  createAlbum);
router.delete("/albums/:id",  deleteAlbum);

export default router;