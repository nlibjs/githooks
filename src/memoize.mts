// biome-ignore lint/complexity/noUselessTypeConstraint: ts(7060)
export const memoize = <T extends unknown>(getter: () => T): (() => T) => {
	let cache: { value: T } | undefined;
	return () => {
		if (!cache) {
			cache = { value: getter() };
		}
		return cache.value;
	};
};
