import * as assert from "node:assert/strict";
import * as fs from "node:fs/promises";
import { test } from "node:test";
import { isDirectDependency } from "./isDirectDependency.mjs";
import { isObjectLike } from "./isObjectLike.mjs";

/**
 * walk through the modulesDirectory and yield the package names.
 */
const listPackagesInDirectory = async function* (
	modulesDirectory: URL,
	scope?: string,
): AsyncGenerator<string> {
	modulesDirectory.pathname = modulesDirectory.pathname.replace(/\/*$/, "/");
	for (const fileName of await fs.readdir(modulesDirectory)) {
		const directory = new URL(fileName, modulesDirectory);
		const stats = await fs.stat(directory);
		if (stats.isDirectory()) {
			if (fileName.startsWith("@")) {
				if (scope) {
					throw new Error(`Unexpected scope: ${scope}/${fileName}`);
				}
				yield* listPackagesInDirectory(directory, fileName);
			} else {
				const modulePackageJsonPath = new URL("package.json", `${directory}/`);
				try {
					if ((await fs.stat(modulePackageJsonPath)).isFile()) {
						yield scope ? `${scope}/${fileName}` : fileName;
					}
				} catch {
					// ignore
				}
			}
		}
	}
};

test("isDirectDependency ", async (t) => {
	const directDependencies = new Set<string>();

	await t.test("list direct dependencies from package.json", async (tt) => {
		const packageJsonUrl = new URL("../package.json", import.meta.url);
		const json = await fs.readFile(packageJsonUrl, "utf8");
		const parseResult = JSON.parse(json);
		if (isObjectLike(parseResult)) {
			const { dependencies, devDependencies } = parseResult;
			if (isObjectLike(dependencies)) {
				for (const key of Object.keys(dependencies)) {
					directDependencies.add(key);
				}
			}
			if (isObjectLike(devDependencies)) {
				for (const key of Object.keys(devDependencies)) {
					directDependencies.add(key);
				}
			}
		}
		const list = Array.from(directDependencies);
		tt.diagnostic(`directDependencies: ${list.join(", ")}`);
	});

	const nodeModules = new URL("../node_modules/", import.meta.url);
	for await (const input of listPackagesInDirectory(nodeModules)) {
		const expected = directDependencies.has(input);
		await t.test(`isDirectDependency('${input}') → ${expected}`, () => {
			assert.equal(isDirectDependency(input), expected);
		});
	}
});
