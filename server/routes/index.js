import { Router } from "express";
import TransactionsRouter from "./transactions.js";
import AuthRouter from "./auth.js";

const router = Router();

router.use("/transactions", TransactionsRouter);
router.use("/auth", AuthRouter);

export default router;
