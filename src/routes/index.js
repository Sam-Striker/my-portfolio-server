import { Router } from "express";
import blogRoutes from "./blog";
import userRoutes from "./user";
import welcome from "../controllers/Welcome";
import docRouter from "../documentation/index";

const router = Router();

router.use("/api/v1", blogRoutes);
router.use("/api/v1", userRoutes);

router.get("/", welcome);
router.use("/api/v1/documentation", docRouter);

router.use("*", (req, res) => {
  res.status(404).json({ success: false, msg: "route not found" });
});

export default router;
