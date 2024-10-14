import * as fs from "node:fs/promises";
import { dirnameForHooks, packageName } from "./config.mjs";
import { getDirectories } from "./getDirectories.mjs";
import { isDirectDependency } from "./isDirectDependency.mjs";
import { run } from "./run.mjs";

export const enable = async () => {
	if (await isDirectDependency(packageName)) {
		const dirs = await getDirectories();
		await fs.mkdir(dirs.hooks, { recursive: true });
		console.info(`${packageName}: created ${dirs.hooks}`);
		const command = `git config --local core.hooksPath ${dirnameForHooks}`;
		await run(command, dirs.projectRoot);
	}
};
