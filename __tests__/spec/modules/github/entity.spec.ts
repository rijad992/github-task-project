import Github from '../../../../src/modules/github/entity';
import { GithubResponseError } from '../../../../src/shared/Errors';
import { MockOctokitService } from '../../../utils/MockOctokitService';

describe('get non forked user repos', () => {
  it('should return object containing user repos', async () => {
    const octokit = new MockOctokitService();
    const username = 'rijad992';
    const entity = new Github({ OctokitService: octokit });
    const res = await entity.getNonForkedUserRepositories(username);
    expect(res).toStrictEqual([
      {
        name: 'd3',
        fork: false,
        branches: [{ name: 'master', latestCommitSha: '4975398kjdsbfbs734' }],
      },
    ]);
  });

  it('should return error message Not found', async () => {
    const octokit = new MockOctokitService();
    const username = 'rijad99jfsdjlfksd2';
    const entity = new Github({ OctokitService: octokit });
    let error: GithubResponseError = null;
    try {
      await entity.getNonForkedUserRepositories(username);
      expect(true).toBe(false);
    } catch (err) {
      error = err as GithubResponseError;
    } finally {
      expect(error instanceof GithubResponseError).toBe(true);
      expect((error as GithubResponseError).getErrorDetails()).toStrictEqual({
        status: 404,
        message: 'Not found',
      });
    }
  });
});
