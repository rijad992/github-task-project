export interface NonForkedUserRepos {
  name: string;
  fork: boolean;
  ownerLogin: string;
  branches: {
    name: string;
    latestCommitSha: string;
  }[];
}
