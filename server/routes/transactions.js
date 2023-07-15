import { Router } from "express";
import * as TransactionController from "../controllers/transactions.js";
import passport from "passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  TransactionController.fetchTransactions
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  TransactionController.createTransaction
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TransactionController.updateTransaction
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TransactionController.deleteTransaction
);

router.get(
  "/categorized",
  passport.authenticate("jwt", { session: false }),
  TransactionController.getCategorizedTransactions
);

export default router;
