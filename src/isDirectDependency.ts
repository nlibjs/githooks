import {getDirectDependencies} from './getDirectDependencies';

export const isDirectDependency = (packageName: string): boolean => getDirectDependencies().has(packageName);
