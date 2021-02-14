import * as console from 'console';
import * as fs from 'fs';
import {getPackageName} from './getPackageName';
import {packageJsonPath} from './packageJsonPath';
import {isDirectDevDependency} from './isDirectDevDependency';
import {spawnSync} from './spawnSync';

export interface EnableGitHooksProps {
    packageJson: string,
    hooksDirectory: string,
}

export const enableGitHooks = async (
    {
        packageJson,
        hooksDirectory,
    }: EnableGitHooksProps,
) => {
    const packageName = await getPackageName(packageJson);
    if (!isDirectDevDependency(packageName)) {
        console.info([
            `${packageName}: install is skipped.`,
            `${packageName} is not installed as a direct dependency.`,
        ].join(' '));
        return;
    }
    await fs.promises.mkdir(hooksDirectory, {recursive: true});
    spawnSync('git', 'config', '--local', 'core.hooksPath', hooksDirectory);
};

if (require.main === module) {
    enableGitHooks({
        packageJson: packageJsonPath,
        hooksDirectory: '.githooks',
    })
    .catch((error: unknown) => {
        console.error(error);
        process.exit();
    });
}
