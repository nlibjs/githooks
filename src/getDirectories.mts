import { execSync } from "node:child_process";
import * as path from "node:path";
import { dirnameForHooks } from "./config.mjs";
import { memoize } from "./memoize.mjs";

export const getDirectories = memoize(() => {
	const command = "git rev-parse --show-toplevel";
	const cwd = new URL("..", import.meta.url);
	const projectRoot = `${execSync(command, { cwd })}`.trim();
	const hooks = path.join(projectRoot, dirnameForHooks);
	return { projectRoot, hooks };
});
