import { Router } from "express";

import textRouter from "./textRouter.js";

const router = Router();

router.use(textRouter);

export default router;
