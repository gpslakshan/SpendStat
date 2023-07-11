import { Router } from "express";

const router = Router();

router.post("/signup", async (req, res) => {
  res.json({ message: "User is created successfully" });
});

export default router;
