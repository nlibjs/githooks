import * as console from 'console';
import {getPackageName} from './getPackageName';
import {spawnSync} from './spawnSync';

export interface DisableProps {
    packageJson: string,
}

export const disable = async (
    {packageJson}: DisableProps,
) => {
    const packageName = await getPackageName(packageJson);
    console.info(`${packageName}.disable: start`);
    spawnSync('git', 'config', '--local', '--unset', 'core.hooksPath');
    console.info(`${packageName}.disable: done`);
};
