import * as fs from 'fs';
import * as path from 'path';
import ava from 'ava';
import { getDirectDependencies } from './getDirectDependencies';
import { isDirectDependency } from './isDirectDependency';

const listPackages = function* (
  modulesDirectory: string,
  scope?: string,
): Generator<string> {
  for (const fileName of fs.readdirSync(modulesDirectory)) {
    const directory = path.join(modulesDirectory, fileName);
    const stats = fs.statSync(directory);
    if (stats.isDirectory()) {
      if (fileName.startsWith('@')) {
        if (scope) {
          throw new Error(`Unexpected scoped scope: ${scope}/${fileName}`);
        } else {
          yield* listPackages(directory, fileName);
        }
      } else {
        const modulePackageJsonPath = path.join(directory, 'package.json');
        try {
          if (fs.statSync(modulePackageJsonPath).isFile()) {
            yield scope ? `${scope}/${fileName}` : fileName;
          }
        } catch {
          // ignore
        }
      }
    }
  }
};

const primaries = getDirectDependencies();
const nodeModules = path.join(__dirname, '../node_modules');
for (const input of listPackages(nodeModules)) {
  const expected = primaries.has(input);
  ava(`isDirectDependency('${input}') → ${expected}`, (t) => {
    t.is(isDirectDependency(input), expected);
  });
}
