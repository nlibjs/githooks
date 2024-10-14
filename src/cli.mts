#!/usr/bin/env node
import * as process from "node:process";
import { usage } from "./config.mjs";
import { disable } from "./disable.mjs";
import { enable } from "./enable.mjs";

switch (process.argv[2]) {
	case "enable":
		await enable();
		break;
	case "disable":
		await disable();
		break;
	default:
		console.info(usage);
}
