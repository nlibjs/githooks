import * as console from 'console';
import * as childProcess from 'child_process';

export interface SpawnResult {
  stdout: string;
  stderr: string;
}

export const spawnSync = (
  command: string,
  args: Array<string>,
  {
    silent,
    ...options
  }: childProcess.SpawnSyncOptions & { silent?: true } = {},
): SpawnResult => {
  console.info(
    `spawn: ${command} ${args.join(' ')}${silent ? ' (silent)' : ''}`,
  );
  const { error, output } = childProcess.spawnSync(command, args, options);
  if (error) {
    throw error;
  }
  const stdout = `${output[1]}`.trim();
  if (stdout && !silent) {
    console.info(stdout);
  }
  const stderr = `${output[2]}`.trim();
  if (stderr) {
    console.error(stderr);
  }
  return { stdout, stderr };
};

interface Command {
  npm: string;
  npx: string;
  git: string;
}

export const command: Command = process.platform.startsWith('win')
  ? {
      git: 'git',
      npm: 'npm.cmd',
      npx: 'npx.cmd',
    }
  : {
      git: 'git',
      npm: 'npm',
      npx: 'npx',
    };
