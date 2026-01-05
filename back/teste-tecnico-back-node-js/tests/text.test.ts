import supertest from "supertest";
import app from "../src/app";
import * as textStore from "../src/store/textStore";

// Mock OpenAI
jest.mock("openai", () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: "Mocked AI response based on the text.",
              },
            },
          ],
        }),
      },
    },
  }));
});

const api = supertest(app);

describe("Text Q&A API", () => {
  beforeEach(() => {
    textStore.clearText();
  });

  describe("POST /upload-text", () => {
    it("should upload text successfully and return 201", async () => {
      const response = await api
        .post("/upload-text")
        .send({ text: "This is a sample text for testing." });

      expect(response.status).toBe(201);
    });

    it("should return 422 when text is missing", async () => {
      const response = await api.post("/upload-text").send({});

      expect(response.status).toBe(422);
    });

    it("should return 422 when text is empty", async () => {
      const response = await api.post("/upload-text").send({ text: "" });

      expect(response.status).toBe(422);
    });
  });

  describe("POST /ask", () => {
    it("should return 400 when no text has been uploaded", async () => {
      const response = await api
        .post("/ask")
        .send({ question: "What is this about?" });

      expect(response.status).toBe(400);
      expect(response.text).toContain("No text has been uploaded");
    });

    it("should return answer when text has been uploaded", async () => {
      // First upload text
      await api.post("/upload-text").send({ text: "Sample text for Q&A." });

      // Then ask a question
      const response = await api
        .post("/ask")
        .send({ question: "What is this about?" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("answer");
      expect(typeof response.body.answer).toBe("string");
    });

    it("should return 422 when question is missing", async () => {
      await api.post("/upload-text").send({ text: "Sample text." });

      const response = await api.post("/ask").send({});

      expect(response.status).toBe(422);
    });

    it("should return 422 when question is empty", async () => {
      await api.post("/upload-text").send({ text: "Sample text." });

      const response = await api.post("/ask").send({ question: "" });

      expect(response.status).toBe(422);
    });
  });
});
