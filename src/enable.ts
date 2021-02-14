import * as console from 'console';
import * as fs from 'fs';
import {getPackageName} from './getPackageName';
import {isDirectDevDependency} from './isDirectDevDependency';
import {spawnSync} from './spawnSync';

export interface EnableProps {
    packageJson: string,
    hooksDirectory: string,
}

export const enable = async (
    {
        packageJson,
        hooksDirectory,
    }: EnableProps,
) => {
    const packageName = await getPackageName(packageJson);
    console.info(`${packageName}.enable: start`);
    if (!isDirectDevDependency(packageName)) {
        console.info([
            `${packageName}.enable: skipped.`,
            `${packageName} is not installed as a direct dependency.`,
        ].join(' '));
        return;
    }
    await fs.promises.mkdir(hooksDirectory, {recursive: true});
    spawnSync('git', 'config', '--local', 'core.hooksPath', hooksDirectory);
    console.info(`${packageName}.enable: done`);
};
