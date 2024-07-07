import { Router } from "express";
import { deleteFont, downloadFont, getArrayBuffers, getFont, getFonts, getParsedFonts, uploadFont } from "../controllers/font.controller.js";
import upload from "../middlewares/upload.js";
import uploadDisk from "../middlewares/uploadDisk.js";

const router = Router();

router.route('/:id/download').get(downloadFont);
router.route('/:id/delete').delete(deleteFont);
router.route('/list').get(getFonts);
router.post('/upload', upload.single('fontFile'), uploadFont);
router.route('/fonts-list').get(getParsedFonts);   //route for parsed fonts list on main site
router.route('/buffer').get(getArrayBuffers);   //temporary route
router.route('/:id').get(getFont)

export default router;