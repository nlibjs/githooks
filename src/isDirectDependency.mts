import { getDirectories } from "./getDirectories.mjs";
import { isObjectLike } from "./isObjectLike.mjs";
import { run } from "./run.mjs";

/**
 * Check if a package is a direct dependency of the current project.
 * A direct dependency is a package that is listed in the package.json file.
 * This function gets the list of direct dependencies by executing
 * `npm ls --depth=0 --json`.
 */
export const isDirectDependency = async (
	packageName: string,
): Promise<boolean> => {
	const command = `npm ls --depth=0 --json ${packageName}`;
	const dirs = await getDirectories();
	const json = (await run(command, dirs.projectRoot, true)).stdout;
	const parseResult = JSON.parse(json);
	if (isObjectLike(parseResult) && isObjectLike(parseResult.dependencies)) {
		return packageName in parseResult.dependencies;
	}
	return false;
};
