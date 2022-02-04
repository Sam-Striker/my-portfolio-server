import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import blog from "../controllers/blogController";


/**
 * @swagger
 * /api/v1/blog/create:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: creating a blog
 *     consumes:
 *       - application/json
 *     requestBody:
 *        required: true
 *        content:
 *           multipart/form-data:
 *              schema:
 *                 type: object
 *                 required:
 *                    - Author
 *                    - Title
 *                    - Content
 *                    - image
 *                 properties:
 *                    Author:
 *                      type: string
 *                    Title:
 *                      type: string
 *                    Content:
 *                      type: string
 *                    image:
 *                      type: string
 *                      format: binary
 *     responses:
 *       201:
 *             description: Blog saved successfully
 *       400:
 *             description: Bad request.
 * */

/**
 * @swagger
 * /api/v1/blog/getAll:
 *   get:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: Retrieve all blogs
 *     consumes:
 *        - application/json
 *     responses:
 *       200:
 *             description: Blogs successfully Retrieved.
 * */

/**
 * @swagger
 * /api/v1/blog/getPost/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     name: Blog
 *     summary: retrieve single blog
 *     consumes:
 *        - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     responses:
 *       200:
 *             description: Blog successfully Retrieved.
 *       404:
 *             description: Blog not found.
 *       500:
 *             description: server error.
 * */


/**
 * @swagger
 * /api/v1/blog/update/{id}:
 *   patch:
 *     tags:
 *       - Blogs
 *     summary: Update a blog
 *     content:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         required: true
 *       - name: id
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             properties:
 *                Author:
 *                 type: string
 *                Title:
 *                 type: string
 *                Content:
 *                 type: string
 *     responses:
 *       200:
 *             description: Blog successfully updated.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 * */

/**
 * @swagger
 * /api/v1/blog/delete/{id}:
 *   delete:
 *     tags:
 *       - Blogs
 *     summary: Delete a blog
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *             description: Successfully Deleted.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 * */


const router = Router();

router.post("/blog/create", blog.createBlog);
router.get("/blog/getAll", blog.readingBlogs);
router.get("/blog/getPost/:id", blog.readingSingleBlog);
router.delete("/blog/delete/:id", checkAuth, blog.deletingBlog);
router.patch("/blog/update/:id", checkAuth, blog.updatingBlog);



export default router;
