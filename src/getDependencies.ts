import type {PackageJson} from './loadPackageJson';
import {parsePackageJsonString} from './loadPackageJson';
import {command, spawnSync} from './spawnSync';

let cached: PackageJson | undefined;
export const getDependencies = (): PackageJson => {
    if (!cached) {
        const {stdout} = spawnSync(command.npm, ['ls', '--depth=0', '--json']);
        cached = parsePackageJsonString(`${stdout}`.trim());
    }
    return cached;
};
