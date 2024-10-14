import type { PathLike, Stats } from "node:fs";
import * as fs from "node:fs/promises";
import { isObjectLike } from "./isObjectLike.mjs";

export const statOrNull = async (pathLike: PathLike): Promise<Stats | null> => {
	try {
		return await fs.stat(pathLike);
	} catch (error: unknown) {
		if (isObjectLike(error) && error.code === "ENOENT") {
			return null;
		}
		throw error;
	}
};
