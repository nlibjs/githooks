import {listDirectDependencies} from './listDirectDependencies';

let cached: Set<string> | undefined;
export const getDirectDependencies = (): Set<string> => {
    if (!cached) {
        cached = new Set(listDirectDependencies());
    }
    return cached;
};
