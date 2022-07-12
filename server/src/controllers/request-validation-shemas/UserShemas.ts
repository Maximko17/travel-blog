import Joi from "joi";

export const signInSchema = Joi.object({
   login: Joi.string().required().messages({
      "string.empty": "Поле не заполнено!",
      "string.base": "Поле не заполнено!",
      "any.required": "Поле не заполнено",
   }),
   password: Joi.string().required().messages({
      "string.empty": "Поле не заполнено!",
      "string.base": "Поле не заполнено!",
      "any.required": "Поле не заполнено",
   }),
   confirmPassword: Joi.ref("password"),
});
