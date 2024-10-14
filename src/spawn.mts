import {
	type SpawnSyncOptions,
	type SpawnSyncReturns,
	spawnSync,
} from "node:child_process";
import * as console from "node:console";
import { packageName } from "./config.mjs";

/**
 * execute a command and return the output as a trimmed string.
 */
export const spawn = (
	command: string,
	options?: SpawnSyncOptions,
): SpawnSyncReturns<string> => {
	console.info(`${packageName}: ${command}`);
	const result = spawnSync(command, { shell: true, ...options });
	if (result.error) {
		throw result.error;
	}
	const stdout = `${result.stdout}`.trim();
	const stderr = `${result.stderr}`.trim();
	if (stderr) {
		console.error(stderr);
	}
	return { ...result, stdout, stderr, output: [stdout, stderr] };
};
