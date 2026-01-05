import Joi from "joi";

export const askSchema = Joi.object({
  question: Joi.string().min(1).required()
});
