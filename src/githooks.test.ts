import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import ava from 'ava';
import {projectRoot} from './directory';
import {spawnSync} from './spawnSync';
import {statOrNull} from './statOrNull';
const npmCommand = process.platform.startsWith('win') ? 'npm.cmd' : 'npm';

ava('enable/disable', async (t) => {
    const cwd = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'githooks-enable-'));
    spawnSync('git', ['init'], {cwd});
    const {stdout: packOutput} = spawnSync(npmCommand, ['pack'], {cwd: projectRoot});
    await fs.promises.writeFile(path.join(cwd, 'package.json'), JSON.stringify({
        name: '@nlib/githooks-test',
        private: true,
    }, null, 4));
    const gitHooksDirectory = path.join(cwd, '.githooks');
    const beforeStats = await statOrNull(gitHooksDirectory);
    t.is(beforeStats, null);
    const originalPackedFile = path.join(projectRoot, packOutput);
    const packedFile = path.join(cwd, packOutput);
    await fs.promises.rename(originalPackedFile, packedFile);
    spawnSync('npm', ['install', '--save-dev', packedFile], {cwd});
    const afterStats = await fs.promises.stat(gitHooksDirectory);
    t.true(afterStats.isDirectory());
    const {stdout: stdout1} = spawnSync('git', ['config', '--local', '--get', 'core.hooksPath'], {cwd});
    t.is(stdout1, '.githooks');
    spawnSync('npx', ['githooks', 'disable'], {cwd});
    const {stdout: stdout2} = spawnSync('git', ['config', '--local', '--get', 'core.hooksPath'], {cwd});
    t.is(stdout2, '');
});
