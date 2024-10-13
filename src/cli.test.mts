import * as assert from "node:assert/strict";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { test } from "node:test";
import { spawnSync } from "./spawnSync.mjs";

const projectRoot = new URL("../", import.meta.url);

test("enable/disable", async () => {
	const cwd = await fs.mkdtemp(path.join(os.tmpdir(), "githooks-"));
	spawnSync("git init", { cwd });
	const { stdout: packOutput } = spawnSync("npm pack", { cwd: projectRoot });
	await fs.writeFile(
		path.join(cwd, "package.json"),
		JSON.stringify({ name: "@nlib/githooks-test", private: true }, null, 4),
	);
	const gitHooksDirectory = path.join(cwd, ".githooks");
	await assert.rejects(
		async () => {
			await fs.stat(gitHooksDirectory);
		},
		{ code: "ENOENT" },
	);
	const originalPackedFile = new URL(packOutput, projectRoot);
	const packedFile = path.join(cwd, packOutput);
	/** fs.rename causes EXDEV error if os.tmpdir returned a path on another device (Windows). */
	await fs.copyFile(originalPackedFile, packedFile);
	await fs.unlink(originalPackedFile);
	spawnSync(`npm install --save-dev ${packedFile}`, { cwd });
	const afterStats = await fs.stat(gitHooksDirectory);
	assert.equal(afterStats.isDirectory(), true);
	{
		const command = "git config --local --get core.hooksPath";
		const { stdout } = spawnSync(command, { cwd });
		assert.equal(stdout, ".githooks");
	}
});
