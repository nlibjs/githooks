import * as childProcess from "node:child_process";
import * as console from "node:console";

interface SpawnResult {
	stdout: string;
	stderr: string;
}

export const spawnSync = (
	command: string,
	options: childProcess.SpawnSyncOptions = {},
): SpawnResult => {
	console.info(`spawn: ${command}`);
	const { error, output } = childProcess.spawnSync(command, {
		shell: true,
		...options,
	});
	if (error) {
		throw error;
	}
	const stdout = `${output[1]}`.trim();
	const stderr = `${output[2]}`.trim();
	if (stderr) {
		console.error(stderr);
	}
	return { stdout, stderr };
};
