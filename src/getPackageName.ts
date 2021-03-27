import {loadPackageJson} from './loadPackageJson';

export const getPackageName = async (packageJsonPath: string): Promise<string> => {
    const {name} = await loadPackageJson(packageJsonPath);
    const normalized = `${name}`.normalize().trim();
    if (normalized !== name || normalized.length === 0) {
        throw new Error(`InvalidPackageName: ${name}`);
    }
    return normalized;
};
