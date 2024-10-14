import * as path from "node:path";
import { dirnameForHooks } from "./config.mjs";
import { spawn } from "./spawn.mjs";

export const getHooksDirPath = (): string => {
	const projectRootPath = spawn("git rev-parse --show-toplevel").stdout;
	return path.join(projectRootPath, dirnameForHooks);
};
