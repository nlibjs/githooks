export const isObjectLike = (v: unknown): v is Record<string, unknown> =>
	Boolean(v) && (typeof v === "object" || typeof v === "function");
