import * as fs from 'fs';
import * as path from 'path';
import * as console from 'console';
import { isDirectDependency } from './isDirectDependency';
import { command, spawnSync } from './spawnSync';

export interface EnableProps {
  hooksDirectory: string;
}

export const enable = async ({ hooksDirectory }: EnableProps) => {
  const packageName = '@nlib/githooks';
  console.info(`${packageName}.enable: start`);
  if (!isDirectDependency(packageName)) {
    console.info(
      [
        `${packageName}.enable: skipped.`,
        `${packageName} is not installed as a direct dependency.`,
      ].join(' '),
    );
    return;
  }
  const { stdout: projectRoot } = spawnSync(command.git, [
    'rev-parse',
    '--show-toplevel',
  ]);
  console.info(`${packageName}.enable: mkdir -p ${projectRoot}`);
  await fs.promises.mkdir(path.join(projectRoot, hooksDirectory), {
    recursive: true,
  });
  spawnSync(command.git, [
    'config',
    '--local',
    'core.hooksPath',
    hooksDirectory,
  ]);
  console.info(`${packageName}.enable: done`);
};
