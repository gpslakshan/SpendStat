import { Router } from "express";
import * as CategoriesController from "../controllers/categories.js";
import passport from "passport";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  CategoriesController.createCategory
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  CategoriesController.updateCategory
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  CategoriesController.deleteCategory
);

export default router;
