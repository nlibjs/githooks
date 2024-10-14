import * as path from "node:path";
import { dirnameForHooks } from "./config.mjs";
import { memoize } from "./memoize.mjs";
import { run } from "./run.mjs";

export const getDirectories = memoize(async () => {
	const command = "git rev-parse --show-toplevel";
	const cwd = new URL("..", import.meta.url);
	const projectRoot = (await run(command, cwd)).stdout;
	const hooks = path.join(projectRoot, dirnameForHooks);
	return { projectRoot, hooks };
});
