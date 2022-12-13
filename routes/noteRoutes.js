import express from "express";
import { getNotes,createNote,getNoteById,updateNote ,deleteNote} from "../controllers/noteController.js";
import { checkUserAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/",checkUserAuth,getNotes);
router.post("/create",checkUserAuth,createNote);
router.get("/:id",checkUserAuth,getNoteById);
router.put("/:id",checkUserAuth,updateNote);
router.delete("/:id",checkUserAuth,deleteNote);

export default router;
