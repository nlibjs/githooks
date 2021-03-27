import {isRecord, isRecordOrUndefined, isStringOrUndefined} from './is';

export interface PackageJson {
    name?: string,
    dependencies?: Record<string, unknown>,
    devDependencies?: Record<string, unknown>,
}

const isPackageJson = (input: unknown): input is PackageJson => isRecord(input)
&& isStringOrUndefined(input.name)
&& isRecordOrUndefined(input.dependencies)
&& isRecordOrUndefined(input.devDependencies);

export const parsePackageJsonString = (packageJsonString: string): PackageJson => {
    const parsed: unknown = JSON.parse(packageJsonString);
    if (isPackageJson(parsed)) {
        return parsed;
    }
    throw new Error(`InvalidPackageJSON ${packageJsonString}`);
};
