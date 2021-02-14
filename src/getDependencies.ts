import {PackageJson, parsePackageJsonString} from './loadPackageJson';
import {spawnSync} from './spawnSync';

let cached: PackageJson | undefined;
export const getDependencies = (): PackageJson => {
    if (!cached) {
        const {stdout} = spawnSync('npm', ['ls', '--depth=0', '--json']);
        cached = parsePackageJsonString(`${stdout}`.trim());
    }
    return cached;
};
