import { Request, Response } from 'express';
import Github from './entity';

import { BaseControler } from '../../core/models/BaseController.model';
import { Get } from '../../core/decorators/http.decorator';
import { NonForkedUserRepos } from '../../core/models/NonForkedUserRepos.model';
import { validateSchema } from '../../shared/validateSchema';
import { findNonForkedUserReposSchema } from './schema';
import findNonForkedUserRepositories from './dto/findNonForkedUserRepos.dto';

class GithubController implements BaseControler {
  entity: Github;
  entityName = 'Github';

  constructor({ Github }) {
    this.entity = Github;
  }

  /**
   * @swagger
   * /api/github/findNonForkedUserRepositories:
   *   get:
   *     summary: Retrieve a collection of non forked user repositories and their branches with latest commits.
   *     parameters:
   *       - in: query
   *         name: username
   *         required: true
   *         description: Github user username
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Returns collection of repositories.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       name:
   *                         type: string
   *                         description: The user's name.
   *                         example: my-hello-world-repo
   *                       fork:
   *                         type: boolean
   *                         description: Shows non forked repo
   *                         example: false
   *                       branches:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             name:
   *                               type: string
   *                               description: Name of branch
   *                               example: main
   *                             latestCommitSha:
   *                               type: string
   *                               description: Sha of latest commit
   *                               example: 8ff373c1daef5e0d299a02bc783ad64b39e3777d
   *       404:
   *         description: Error response when user is not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 data:
   *                   type: object
   *                   properties:
   *                     message:
   *                       type: string
   *                       example: Not found
   *                     status:
   *                       type: number
   *                       example: 404
   */
  @Get
  async findNonForkedUserRepositories(
    req: Request,
    _res: Response,
    next: (responseObj: NonForkedUserRepos[], err: Error) => void,
  ): Promise<void> {
    await validateSchema<findNonForkedUserRepositories>(
      findNonForkedUserReposSchema(),
      {
        username: req.query.username as string,
      },
    );
    const username = req.query.username as string;
    const repos = await this.entity.getNonForkedUserRepositories(username);
    next(repos, null);
  }
}

export default GithubController;
