import Joi from "joi";

export const textSchema = Joi.object({
  text: Joi.string().min(1).required()
});
