import * as process from "node:process";
import { enable } from "./enable.mjs";
import { spawnSync } from "./spawnSync.mjs";

switch (process.argv[2]) {
	case "enable":
		await enable({ hooksDirectory: ".githooks" });
		break;
	case "disable":
		spawnSync("git config --local --unset core.hooksPath");
		break;
	default:
		throw new Error(`UnexpectedAction: ${process.argv.slice(2).join(" ")}`);
}
