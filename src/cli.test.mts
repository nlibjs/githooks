import * as assert from "node:assert/strict";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { dirnameForHooks } from "./config.mjs";
import { spawn } from "./spawn.mjs";

test("enable → disable", async (t) => {
	const testDir = await fs.mkdtemp(path.join(os.tmpdir(), "githooks-"));

	await t.test("git init", async () => {
		const cwd = testDir;
		spawn("git init", { cwd });
	});

	await t.test("create package.json", async () => {
		const data = { name: "@nlib/githooks-test", private: true };
		const dest = path.join(testDir, "package.json");
		await fs.writeFile(dest, JSON.stringify(data, null, 4));
	});

	let tgzFileUrl: URL | undefined;

	await t.test("npm pack", async (tt) => {
		const cwd = new URL("../", import.meta.url);
		const tgzFileName = spawn("npm pack", { cwd }).stdout;
		tt.diagnostic(`tgzFileName: ${tgzFileName}`);
		tgzFileUrl = new URL(tgzFileName, cwd);
		t.after(async () => {
			if (tgzFileUrl) {
				await fs.unlink(tgzFileUrl);
			}
		});
	});

	await t.test("npm install --save-dev", async (tt) => {
		if (!tgzFileUrl) {
			throw new TypeError("tgzFileUrl is not defined");
		}
		const cwd = testDir;
		const command = `npm install --save-dev ${fileURLToPath(tgzFileUrl)}`;
		const result = spawn(command, { cwd });
		tt.diagnostic(result.stdout.replace(/\s*\n\s*/g, " "));
	});

	await t.test("check core.hooksPath", async () => {
		const cwd = testDir;
		const command = "git config --local --get core.hooksPath";
		const result = spawn(command, { cwd });
		assert.equal(result.stdout, dirnameForHooks);
	});

	await t.test(`stat ${dirnameForHooks}`, async () => {
		const hooksDirPath = path.join(testDir, dirnameForHooks);
		const stats = await fs.stat(hooksDirPath);
		assert.equal(stats.isDirectory(), true);
	});
});
