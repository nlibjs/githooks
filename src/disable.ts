import * as console from 'console';
import {command, spawnSync} from './spawnSync';

export const disable = async () => {
    const packageName = '@nlib/githooks';
    console.info(`${packageName}.disable: start`);
    spawnSync(command.git, ['config', '--local', '--unset', 'core.hooksPath']);
    console.info(`${packageName}.disable: done`);
    await Promise.resolve();
};
