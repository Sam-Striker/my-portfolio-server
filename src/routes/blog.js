import { Router } from "express";
import blog from "../controllers/blogController";
const router = Router();

router.post("/blog/create", blog.createBlog);
router.get("/blog/getAll", blog.readingBlogs);
router.get("/blog/getPost/:id", blog.readingSingleBlog);
router.delete("/blog/delete/:id", blog.deletingBlog);
router.patch("/blog/update/:id", blog.updatingBlog);


export default router;
