import * as fs from "node:fs/promises";
import { dirnameForHooks, packageName } from "./config.mjs";
import { getDirectories } from "./getDirectories.mjs";
import { ignoreENOENT } from "./ignoreENOENT.mjs";
import { run } from "./run.mjs";

export const disable = async () => {
	const dirs = await getDirectories();
	await run("git config --local --unset core.hooksPath", dirs.projectRoot);
	await run(`npm uninstall ${packageName}`, dirs.projectRoot);
	const stats = await fs.stat(dirs.hooks).catch(ignoreENOENT);
	if (stats) {
		if (stats.isDirectory() && (await fs.readdir(dirs.hooks)).length === 0) {
			await fs.rmdir(dirs.hooks);
		} else {
			console.info(`${dirnameForHooks} is not empty.`);
			console.info(`Please remove the ${dirnameForHooks} directory manually.`);
		}
	}
};
