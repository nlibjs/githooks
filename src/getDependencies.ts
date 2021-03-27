import type {PackageJson} from './parsePackageJsonString';
import {parsePackageJsonString} from './parsePackageJsonString';
import {command, spawnSync} from './spawnSync';

let cached: PackageJson | undefined;
export const getDependencies = (): PackageJson => {
    if (!cached) {
        const {stdout} = spawnSync(command.npm, ['ls', '--depth=0', '--json'], {silent: true});
        cached = parsePackageJsonString(`${stdout}`.trim());
    }
    return cached;
};
