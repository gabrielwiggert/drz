import OpenAI from "openai";
import dotenv from "dotenv";
import * as textStore from "../store/textStore.js";
import * as errors from "../utils/errors.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful assistant that answers questions ONLY based on the provided text.
If the answer cannot be found in the text, you must respond exactly with:
"Não sei com base nas informações fornecidas."
Do not make up information or use external knowledge.

TEXT:
`;

export interface UploadTextData {
  text: string;
}

export interface AskQuestionData {
  question: string;
}

async function uploadText(data: UploadTextData): Promise<void> {
  textStore.setText(data.text);
}

async function askQuestion(data: AskQuestionData): Promise<string> {
  const storedText = textStore.getText();

  if (!storedText) {
    throw errors.textNotFoundError("No text has been uploaded. Please upload text first using POST /upload-text");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT + storedText,
        },
        {
          role: "user",
          content: data.question,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const answer = completion.choices[0]?.message?.content;

    if (!answer) {
      throw errors.aiServiceError("AI returned an empty response.");
    }

    return answer;
  } catch (error) {
    if (errors.isAppError(error)) {
      throw error;
    }
    console.error("OpenAI API error:", error);
    throw errors.aiServiceError("Failed to get response from AI service.");
  }
}

const textService = {
  uploadText,
  askQuestion,
};

export default textService;
