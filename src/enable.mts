import * as fs from "node:fs";
import { dirnameForHooks, packageName } from "./config.mjs";
import { getHooksDirPath } from "./getHooksDirPath.mjs";
import { isDirectDependency } from "./isDirectDependency.mjs";
import { spawn } from "./spawn.mjs";

export const enable = () => {
	if (isDirectDependency(packageName)) {
		const hooksDirPath = getHooksDirPath();
		fs.mkdirSync(hooksDirPath);
		spawn(`git config --local core.hooksPath ${dirnameForHooks}`);
		console.info(`${packageName} enable: done`);
	}
};
