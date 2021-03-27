import * as fs from 'fs';
import {parsePackageJsonString} from './parsePackageJsonString';
import type {PackageJson} from './parsePackageJsonString';

export const loadPackageJson = async (packageJsonPath: string): Promise<PackageJson> => parsePackageJsonString(await fs.promises.readFile(packageJsonPath, 'utf8'));
