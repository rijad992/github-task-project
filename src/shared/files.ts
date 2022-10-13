import glob from 'glob';

export const globFiles = (globPath: string): string[] => {
  return glob.sync(globPath);
};
