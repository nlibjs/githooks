import { isObjectLike } from "./isObjectLike.mjs";

export const ignoreENOENT = (error: unknown): null => {
	if (isObjectLike(error) && error.code === "ENOENT") {
		return null;
	}
	throw error;
};
