import * as fs from "node:fs";
import { dirnameForHooks, packageName } from "./config.mjs";
import { getDirectories } from "./getDirectories.mjs";
import { run } from "./run.mjs";
import { statOrNull } from "./statOrNull.mjs";

export const disable = async () => {
	const dirs = getDirectories();
	await run("git config --local --unset core.hooksPath", dirs.projectRoot);
	await run(`npm uninstall ${packageName}`, dirs.projectRoot);
	const stats = await statOrNull(dirs.hooks);
	if (stats) {
		if (stats.isDirectory() && fs.readdirSync(dirs.hooks).length === 0) {
			fs.rmdirSync(dirs.hooks);
		} else {
			console.info(`${dirnameForHooks} is not empty.`);
			console.info(`Please remove the ${dirnameForHooks} directory manually.`);
		}
	}
};
