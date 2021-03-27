#!/usr/bin/env node
import * as fs from 'fs';
import * as console from 'console';
import {enable} from './enable';
import {disable} from './disable';
import {packageJsonPath} from './directory';

if (require.main === module) {
    const ActionEnable = 'enable';
    const ActionDisable = 'disable';
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
    const {name: packageName} = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as {name: string};
    switch (action) {
    case ActionEnable:
        enable({packageName, hooksDirectory: '.githooks'}).catch(onError);
        break;
    case ActionDisable:
        disable({packageName}).catch(onError);
        break;
    default:
        throw new Error(`UnexpectedAction: ${args.join(' ')}`);
    }
}
