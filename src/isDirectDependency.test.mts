import * as fs from 'node:fs';
import ava from 'ava';
import { getDirectDependencies } from './getDirectDependencies.mjs';
import { isDirectDependency } from './isDirectDependency.mjs';

const listPackages = function* (
  modulesDirectory: URL,
  scope?: string,
): Generator<string> {
  modulesDirectory.pathname = modulesDirectory.pathname.replace(/\/*$/, '/');
  for (const fileName of fs.readdirSync(modulesDirectory)) {
    const directory = new URL(fileName, modulesDirectory);
    const stats = fs.statSync(directory);
    if (stats.isDirectory()) {
      if (fileName.startsWith('@')) {
        if (scope) {
          throw new Error(`Unexpected scoped scope: ${scope}/${fileName}`);
        } else {
          yield* listPackages(directory, fileName);
        }
      } else {
        const modulePackageJsonPath = new URL('package.json', `${directory}/`);
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
const nodeModules = new URL('../node_modules/', import.meta.url);
for (const input of listPackages(nodeModules)) {
  const expected = primaries.has(input);
  ava(`isDirectDependency('${input}') → ${expected}`, (t) => {
    t.is(isDirectDependency(input), expected);
  });
}
