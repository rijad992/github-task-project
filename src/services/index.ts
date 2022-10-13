import ModuleDiscoveryService from './moduleDiscoveryService';

export const initAppServices = async (): Promise<void> => {
  await ModuleDiscoveryService.instance.init();
};
