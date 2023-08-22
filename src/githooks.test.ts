import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import ava from 'ava';
import { spawnSync, command } from './spawnSync';

const projectRoot = path.join(__dirname, '..');
const isObject = (input: unknown): input is Record<string, unknown> =>
  typeof input === 'object' && input !== null;

ava('enable/disable', async (t) => {
  const cwd = await fs.promises.mkdtemp(
    path.join(os.tmpdir(), 'githooks-enable-'),
  );
  spawnSync(command.git, ['init'], { cwd });
  const { stdout: packOutput } = spawnSync(command.npm, ['pack'], {
    cwd: projectRoot,
  });
  await fs.promises.writeFile(
    path.join(cwd, 'package.json'),
    JSON.stringify(
      {
        name: '@nlib/githooks-test',
        private: true,
      },
      null,
      4,
    ),
  );
  const gitHooksDirectory = path.join(cwd, '.githooks');
  const beforeStats = await fs.promises
    .stat(gitHooksDirectory)
    .catch((error: unknown) => {
      if (isObject(error) && error.code === 'ENOENT') {
        return null;
      }
      throw error;
    });
  t.is(beforeStats, null);
  const originalPackedFile = path.join(projectRoot, packOutput);
  const packedFile = path.join(cwd, packOutput);
  /** fs.rename causes EXDEV error if os.tmpdir returned a path on another device (Windows). */
  await fs.promises.copyFile(originalPackedFile, packedFile);
  await fs.promises.unlink(originalPackedFile);
  spawnSync(command.npm, ['install', '--save-dev', packedFile], { cwd });
  const afterStats = await fs.promises.stat(gitHooksDirectory);
  t.true(afterStats.isDirectory());
  const { stdout: stdout1 } = spawnSync(
    command.git,
    ['config', '--local', '--get', 'core.hooksPath'],
    { cwd },
  );
  t.is(stdout1, '.githooks');
  // const packageJsonPath = path.join(__dirname, '../package.json');
  // const {name: packageName} = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as {name: string};
  // spawnSync(command.npm, ['uninstall', packageName], {cwd});
  // const {stdout: stdout2} = spawnSync(command.git, ['config', '--local', '--get', 'core.hooksPath'], {cwd});
  // t.is(stdout2, '');
});
