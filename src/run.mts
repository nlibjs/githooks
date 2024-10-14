import { type SpawnOptions, spawn } from "node:child_process";
import * as console from "node:console";
import { packageName } from "./config.mjs";

interface RunResult {
	status: number | null;
	stdout: string;
	stderr: string;
}

const printer =
	(writable: { write: (chunk: Buffer) => void }, buffer: Array<Buffer>) =>
	(chunk: Buffer) => {
		writable.write(chunk);
		buffer.push(chunk);
	};

/**
 * execute a command and return the output as a trimmed string.
 */
export const run = async (
	command: string,
	cwd: Exclude<SpawnOptions["cwd"], undefined>,
	ignoreStatus = false,
): Promise<RunResult> =>
	await new Promise<RunResult>((resolve, reject) => {
		console.info(`${packageName}: ${command}`);
		const child = spawn(command, { shell: true, cwd });
		const stdoutBuffer: Array<Buffer> = [];
		const stderrBuffer: Array<Buffer> = [];
		child.stdout?.on("data", printer(process.stdout, stdoutBuffer));
		child.stderr?.on("data", printer(process.stderr, stderrBuffer));
		child.once("error", reject);
		child.once("exit", (status) => {
			const stdout = Buffer.concat(stdoutBuffer).toString().trim();
			const stderr = Buffer.concat(stderrBuffer).toString().trim();
			if (status === 0 || ignoreStatus) {
				resolve({ status, stdout, stderr });
			} else {
				reject(new Error(`exit status is ${status}`));
			}
		});
	});
