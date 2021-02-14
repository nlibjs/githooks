import * as path from 'path';
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
