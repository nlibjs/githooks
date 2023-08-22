import { getDirectDependencies } from './getDirectDependencies.mjs';

export const isDirectDependency = (packageName: string): boolean =>
  getDirectDependencies().has(packageName);
