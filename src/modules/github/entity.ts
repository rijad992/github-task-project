import GithubRequestError from '../../core/models/GithubRequestError.model';
import { NonForkedUserRepos } from '../../core/models/NonForkedUserRepos.model';
import OctokitService from '../../services/octokitService';
import { GithubResponseError } from '../../shared/Errors';

class Github {
  readonly octokitService: OctokitService;

  constructor({ OctokitService }) {
    this.octokitService = OctokitService;
  }

  getNonForkedUserRepositories = async (
    username: string,
  ): Promise<NonForkedUserRepos[]> => {
    try {
      const res = await this.octokitService.octokit.rest.repos.listForUser({
        username,
      });

      const nonForkedRepos = await Promise.all(
        res.data
          .filter((repo) => !repo.fork)
          .map(async ({ name, fork }) => ({
            name,
            fork,
            branches: (
              await this.octokitService.octokit.rest.repos.listBranches({
                owner: username,
                repo: name,
              })
            ).data.map(({ name, commit }) => ({
              name,
              latestCommitSha: commit.sha,
            })),
          })),
      );

      return nonForkedRepos;
    } catch (err) {
      throw new GithubResponseError({
        status: (err as GithubRequestError).status,
        message: (err as GithubRequestError).message,
      });
    }
  };
}

export default Github;
