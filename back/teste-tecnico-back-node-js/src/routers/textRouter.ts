import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { textSchema } from "../schemas/textSchema.js";
import { askSchema } from "../schemas/askSchema.js";
import textController from "../controllers/textController.js";

const textRouter = Router();

textRouter.post("/upload-text", validateSchemaMiddleware(textSchema), textController.uploadText);
textRouter.post("/ask", validateSchemaMiddleware(askSchema), textController.ask);

export default textRouter;
