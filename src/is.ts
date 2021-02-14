export const isRecord = (
    input: unknown,
): input is Record<string, unknown | undefined> => Boolean(input) && typeof input === 'object';

export const isString = (
    input: unknown,
): input is string => typeof input === 'string';
