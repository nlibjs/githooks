import {command, spawnSync} from './spawnSync';

interface NpmLsOutput {
    name?: string,
    dependencies?: Record<string, unknown>,
}

const listDirectDependencies = function* (): Generator<string> {
    const {stdout} = spawnSync(command.npm, ['ls', '--depth=0', '--json'], {silent: true});
    const {name = '', dependencies = {}} = JSON.parse(`${stdout}`.trim()) as NpmLsOutput;
    if (name) {
        yield name;
    }
    for (const key of Object.keys(dependencies)) {
        yield key;
    }
};

let cached: Set<string> | undefined;
export const getDirectDependencies = (): Set<string> => {
    if (!cached) {
        cached = new Set(listDirectDependencies());
    }
    return cached;
};
