import { Router} from "express";
import UserController from "../controllers/userModal";


/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Creates a new user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                 type: string
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already in the system.
 * */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: login a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already in the system.
 * */



const router = Router();

router.post("/user/register", UserController.userRegister);
router.post("/user/login", UserController.userLogin);

export default router;
