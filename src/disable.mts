import * as fs from "node:fs";
import { dirnameForHooks, packageName } from "./config.mjs";
import { getHooksDirPath } from "./getHooksDirPath.mjs";
import { spawn } from "./spawn.mjs";

export const disable = () => {
	spawn("git config --local --unset core.hooksPath");
	spawn(`npm uninstall ${packageName}`);
	const hooksDirPath = getHooksDirPath();
	if (fs.existsSync(hooksDirPath)) {
		if (fs.readdirSync(hooksDirPath).length === 0) {
			fs.rmdirSync(hooksDirPath);
		} else {
			console.info(`${dirnameForHooks} is not empty.`);
			console.info(`Please remove the ${dirnameForHooks} directory manually.`);
		}
	}
};
