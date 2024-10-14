import { isObjectLike } from "./isObjectLike.mjs";
import { spawn } from "./spawn.mjs";

const listDirectDependencies = function* (): Generator<string> {
	const { stdout } = spawn("npm ls --depth=0 --json");
	const parseResult = JSON.parse(`${stdout}`.trim());
	if (isObjectLike(parseResult)) {
		if (typeof parseResult.name === "string") {
			yield parseResult.name;
		}
		if (isObjectLike(parseResult.dependencies)) {
			for (const key of Object.keys(parseResult.dependencies)) {
				yield key;
			}
		}
	}
};

let directDependencies: Set<string> | undefined;

/**
 * Check if a package is a direct dependency of the current project.
 * A direct dependency is a package that is listed in the package.json file.
 * This function gets the list of direct dependencies by executing
 * `npm ls --depth=0 --json`.
 */
export const isDirectDependency = (packageName: string): boolean => {
	if (!directDependencies) {
		directDependencies = new Set(listDirectDependencies());
	}
	return directDependencies.has(packageName);
};
