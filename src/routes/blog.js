import { Router } from "express";
import blog from "../controllers/blog";
const router = Router();

router.post("/blog", blog.create);

export default router;
