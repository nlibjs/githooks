import * as process from "node:process";
import { githooks } from "./githooks.mjs";
await githooks(process.argv.slice(2));
