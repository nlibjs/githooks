import { enable } from "./enable.mjs";
import { disable } from "./disable.mjs";

export const githooks = async (args: Array<string>) => {
	switch (args[0]) {
		case "enable":
			await enable({ hooksDirectory: ".githooks" });
			break;
		case "disable":
			await disable();
			break;
		default:
			throw new Error(`UnexpectedAction: ${args.join(" ")}`);
	}
};
