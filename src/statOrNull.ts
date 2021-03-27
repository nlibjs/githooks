import * as fs from 'fs';
import {isRecord} from './is';

export const statOrNull = async (filePath: string): Promise<fs.Stats | null> => await fs.promises.stat(filePath)
.catch((error: unknown) => {
    if (isRecord(error) && error.code === 'ENOENT') {
        return null;
    }
    throw error;
});
