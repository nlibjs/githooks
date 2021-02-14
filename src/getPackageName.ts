import * as fs from 'fs';
import {isRecord} from './is';

export const getPackageName = async (
    packageJsonPath: string,
): Promise<string> => {
    const json = await fs.promises.readFile(packageJsonPath, 'utf8');
    const parsed: unknown = JSON.parse(json);
    if (!isRecord(parsed)) {
        throw new Error(`InvalidPackageJSON ${packageJsonPath}`);
    }
    const {name} = parsed;
    const normalized = `${name}`.normalize().trim();
    if (normalized !== name || normalized.length === 0) {
        throw new Error(`InvalidPackageJSON.name ${name}`);
    }
    return normalized;
};
