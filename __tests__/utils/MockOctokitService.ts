export class MockOctokitService {
  octokit = {
    rest: {
      repos: {
        listForUser: ({ username }): Promise<unknown> => {
          return new Promise((resolve, reject) => {
            if (username === 'rijad992') {
              resolve({
                data: [
                  {
                    name: 'd3',
                    fork: false,
                    owner: { login: 'rijad992' },
                  },
                ],
              });
            }

            reject({ status: 404, message: 'Not found' });
          });
        },
        listBranches: (): Promise<unknown> =>
          new Promise((resolve) => {
            resolve({
              data: [{ name: 'master', commit: { sha: '4975398kjdsbfbs734' } }],
            });
          }),
      },
    },
  };
}
