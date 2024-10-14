export const isObjectLike = (
	value: unknown,
): value is Record<string, unknown> =>
	Boolean(value) && (typeof value === "object" || typeof value === "function");
