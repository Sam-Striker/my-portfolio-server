import { Router } from "express";
import blogRoutes from "./blog";
import welcome from "../controllers/Welcome";

const router = Router();

router.use("/api/v1", blogRoutes);
router.get("/", welcome);

router.use("*", (req, res) => {
  res.status(404).json({ success: false, msg: "route not found" });
});

export default router;
