import * as awilix from 'awilix';
import GithubController from '../../modules/github/controller';
import Github from '../../modules/github/entity';
import OctokitService from '../../services/octokitService';

export const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

export function diSetupInit(): void {
  container.register({
    GithubController: awilix.asClass(GithubController),
    Github: awilix.asClass(Github),
    OctokitService: awilix.asClass(OctokitService),
  });
}
