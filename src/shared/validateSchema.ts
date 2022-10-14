import Joi from 'joi';
import { SchemaError } from './Errors';

export const validateSchema = async <T>(
  schema: Joi.ObjectSchema,
  schemaValue: T,
) => {
  try {
    const res = await schema.validateAsync(schemaValue);
    return res;
  } catch (err) {
    throw new SchemaError({ message: (err as Joi.ValidationError).message });
  }
};
