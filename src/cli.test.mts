import * as assert from "node:assert/strict";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { dirnameForHooks } from "./config.mjs";
import { run } from "./run.mjs";
import { statOrNull } from "./statOrNull.mjs";

test("enable → disable", async (t) => {
	const testDir = await fs.mkdtemp(path.join(os.tmpdir(), "githooks-"));
	t.diagnostic(`testDir: ${testDir}`);
	{
		await run("git init", testDir);
		t.diagnostic("done: git init");
		const command = "git config --local --get core.hooksPath";
		const result = await run(command, testDir, true);
		t.diagnostic(`core.hooksPath: ${result.stdout}`);
		assert.equal(result.stdout, "");
	}
	{
		const dest = path.join(testDir, "package.json");
		const data = { name: "@nlib/githooks-test", private: true };
		await fs.writeFile(dest, JSON.stringify(data, null, 4));
		t.diagnostic("created: package.json");
	}
	let tgzFileUrl: URL | undefined;
	t.after(async () => {
		if (tgzFileUrl) {
			await fs.unlink(tgzFileUrl);
		}
	});
	{
		const cwd = new URL("../", import.meta.url);
		const tgzFileName = (await run("npm pack", cwd)).stdout;
		t.diagnostic(`done: npm pack { tgzFileName: ${tgzFileName} }`);
		tgzFileUrl = new URL(tgzFileName, cwd);
	}
	{
		const command = [
			"npm install --save-dev",
			fileURLToPath(tgzFileUrl),
			"--foreground-scripts",
		].join(" ");
		await run(command, testDir);
		t.diagnostic("done: npm install");
	}
	{
		const command = "git config --local --get core.hooksPath";
		const result = await run(command, testDir);
		t.diagnostic(`core.hooksPath: ${result.stdout}`);
		assert.equal(result.stdout, dirnameForHooks);
	}
	{
		t.diagnostic(`files: ${(await fs.readdir(testDir)).join(", ")}`);
		const stats = await statOrNull(path.join(testDir, dirnameForHooks));
		assert.equal(stats?.isDirectory(), true);
	}
	{
		const command = "npx githooks-cli disable";
		await run(command, testDir);
		t.diagnostic("done: disable hooks");
	}
	{
		const command = "git config --local --get core.hooksPath";
		const result = await run(command, testDir, true);
		t.diagnostic(`core.hooksPath: ${result.stdout}`);
		assert.equal(result.stdout, "");
	}
	{
		const command = "npx githooks-cli enable";
		await assert.rejects(async () => await run(command, testDir));
	}
});
