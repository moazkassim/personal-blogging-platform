import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().max(100).required(),
  content: Joi.string().required(),
});
