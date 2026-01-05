import { Request, Response } from "express";
import textService from "../services/textService.js";

async function uploadText(req: Request, res: Response) {
  const { text } = req.body;
  await textService.uploadText({ text });
  res.sendStatus(201);
}

async function ask(req: Request, res: Response) {
  const { question } = req.body;
  const answer = await textService.askQuestion({ question });
  res.json({ answer });
}

const textController = {
  uploadText,
  ask,
};

export default textController;
