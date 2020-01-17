import Joi from '@hapi/joi';

export default function validarTriangulo(dados) {
  const esquema = {
    lados: Joi.array().items(
      Joi.number().positive()
    ).min(3).max(3).required(),
  };

  return Joi.object(esquema).validate(dados);
};
