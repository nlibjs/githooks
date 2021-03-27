import {getDependencies} from './getDependencies';

export const listDirectDependencies = function* (): Generator<string> {
    const packageJson = getDependencies();
    if (packageJson.name) {
        yield packageJson.name;
    }
    for (const key of Object.keys(packageJson.dependencies || {})) {
        yield key;
    }
    for (const key of Object.keys(packageJson.devDependencies || {})) {
        yield key;
    }
};
