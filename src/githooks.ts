#!/usr/bin/env node
import * as console from 'console';
import {packageJsonPath} from './directory';
import {enable} from './enable';
import {disable} from './disable';
import {getPackageName} from './getPackageName';

const ActionEnable = 'enable';
const ActionDisable = 'disable';

if (require.main === module) {
    const args = process.argv.slice(2);
    const [action] = args;
    const availableAction = new Set([ActionEnable, ActionDisable]);
    if (1 < args.length || !availableAction.has(action)) {
        throw new Error(`UnexpectedArguments: ${args.join(' ')}`);
    }
    const onError = (error: unknown) => {
        console.error(error);
        process.exit();
    };
    switch (action) {
    case ActionEnable:
        getPackageName(packageJsonPath)
        .then(async (packageName) => await enable({
            packageName,
            hooksDirectory: '.githooks',
        }))
        .catch(onError);
        break;
    case ActionDisable:
        getPackageName(packageJsonPath)
        .then(async (packageName) => await disable({packageName}))
        .catch(onError);
        break;
    default:
        throw new Error(`UnexpectedAction: ${args.join(' ')}`);
    }
}
