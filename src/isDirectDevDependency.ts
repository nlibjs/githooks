import {isRecord} from './is';
import {spawnSync} from './spawnSync';

export const isDirectDevDependency = (
    packageName: string,
): boolean => {
    const {stdout} = spawnSync('npm', 'ls', '--dev', '--depth=0', '--json', packageName);
    const data: unknown = JSON.parse(`${stdout}`.trim());
    if (!isRecord(data)) {
        throw new Error(`UnexpectedOutput: ${JSON.stringify(data, null, 4)}`);
    }
    const {dependencies} = data;
    if (isRecord(dependencies)) {
        return packageName in dependencies;
    }
    return data.name === packageName;
};
