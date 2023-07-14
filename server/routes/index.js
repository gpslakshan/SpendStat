import { Router } from "express";
import TransactionsRouter from "./transactions.js";
import AuthRouter from "./auth.js";
import CategoriesRouter from "./categories.js";

const router = Router();

router.use("/transactions", TransactionsRouter);
router.use("/auth", AuthRouter);
router.use("/categories", CategoriesRouter);

export default router;
