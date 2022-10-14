import Joi from 'joi';
import findNonForkedUserRepositories from './dto/findNonForkedUserRepos.dto';

export const findNonForkedUserReposSchema =
  (): Joi.ObjectSchema<findNonForkedUserRepositories> =>
    Joi.object<findNonForkedUserRepositories>({
      username: Joi.string().required(),
    });
