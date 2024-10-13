import * as console from "node:console";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { isDirectDependency } from "./isDirectDependency.mjs";
import { spawnSync } from "./spawnSync.mjs";

const getPackageName = async () => {
	const jsonUrl = new URL("../package.json", import.meta.url);
	const json = await fs.readFile(jsonUrl, "utf8");
	const { name } = JSON.parse(json);
	if (typeof name !== "string") {
		throw new TypeError("Cannot read package name from package.json");
	}
	return name;
};

export const enable = async ({
	hooksDirectory,
}: { hooksDirectory: string }) => {
	const packageName = await getPackageName();
	if (!isDirectDependency(packageName)) {
		return;
	}
	const { stdout: projectRoot } = spawnSync("git rev-parse --show-toplevel");
	console.info(`${packageName}.enable: mkdir -p ${projectRoot}`);
	await fs.mkdir(path.join(projectRoot, hooksDirectory), { recursive: true });
	spawnSync(`git config --local core.hooksPath ${hooksDirectory}`);
	console.info(`${packageName}.enable: done`);
};
