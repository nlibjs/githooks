import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import ava from 'ava';
import {testFunction} from '@nlib/test';
import {getPackageName} from './getPackageName';

testFunction(getPackageName, {
    input: path.join(__dirname, '../package.json'),
    expected: '@nlib/githooks',
});
testFunction(getPackageName, {
    input: path.join(__dirname, '../node_modules/@nlib/test/package.json'),
    expected: '@nlib/test',
});

ava('invalid name', async (t) => {
    const temp = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'githooks-getPackageName-'));
    const packageJsonPath = path.join(temp, 'package.json');
    await fs.promises.writeFile(packageJsonPath, JSON.stringify({name: ' aaa'}, null, 4));
    await t.throwsAsync(async () => {
        await getPackageName(packageJsonPath);
    }, {message: /^InvalidPackageName/});
});
