import { execSync } from "node:child_process";
import { getDirectories } from "./getDirectories.mjs";
import { isObjectLike } from "./isObjectLike.mjs";
import { memoize } from "./memoize.mjs";

const getDirectDependencies = memoize(() => {
	const dirs = getDirectories();
	const parseResult = JSON.parse(
		`${execSync("npm ls --depth=0 --json", { cwd: dirs.projectRoot })}`,
	);
	if (isObjectLike(parseResult) && isObjectLike(parseResult.dependencies)) {
		return new Set(Object.keys(parseResult.dependencies));
	}
	throw new Error("Failed to get dependencies.");
});

/**
 * Check if a package is a direct dependency of the current project.
 * A direct dependency is a package that is listed in the package.json file.
 * This function gets the list of direct dependencies by executing
 * `npm ls --depth=0 --json`.
 */
export const isDirectDependency = (packageName: string): boolean =>
	getDirectDependencies().has(packageName);
