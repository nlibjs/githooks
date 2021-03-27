export const isString = (input: unknown): input is string => typeof input === 'string';
export const isUndefined = (input: unknown): input is undefined => typeof input === 'undefined';
export const isRecord = (input: unknown): input is Record<string, unknown> => typeof input === 'object' && input !== null;
export const isStringOrUndefined = (input: unknown): input is string | undefined => isString(input) || isUndefined(input);
export const isRecordOrUndefined = (input: unknown): input is Record<string, unknown> | undefined => isRecord(input) || isUndefined(input);
