import * as console from 'console';
import {spawnSync} from './spawnSync';

export interface DisableProps {
    packageName: string,
}

export const disable = async (
    {packageName}: DisableProps,
) => {
    await Promise.resolve();
    console.info(`${packageName}.disable: start`);
    spawnSync('git', ['config', '--local', '--unset', 'core.hooksPath']);
    console.info(`${packageName}.disable: done`);
};
