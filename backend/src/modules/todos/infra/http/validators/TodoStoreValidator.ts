import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (request: Request, response: Response, next: NextFunction): RequestHandler => {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      descricao: Joi.string().required().messages({
        'any.required': `O campo 'descricao' não pode estar vazio.`,
        'string.empty': `O campo 'descricao' não pode estar vazio.`,
      }),
    }),
  })(request, response, next);
};
