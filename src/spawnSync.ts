import * as console from 'console';
import * as childProcess from 'child_process';

export interface SpawnResult {
    stdout: string,
    stderr: string,
}

export const spawnSync = (
    command: string,
    args: Array<string>,
    options?: childProcess.SpawnSyncOptions,
): SpawnResult => {
    console.info(`spawn: ${command} ${args.join(' ')}`);
    const {error, output} = childProcess.spawnSync(command, args, options);
    if (error) {
        throw error;
    }
    const stdout = `${output[1]}`.trim();
    if (stdout) {
        console.info(stdout);
    }
    const stderr = `${output[2]}`.trim();
    if (stderr) {
        console.error(stderr);
    }
    return {stdout, stderr};
};
