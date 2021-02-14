import * as console from 'console';
import {packageJsonPath} from './packageJsonPath';
import {enable} from './enable';
import {disable} from './disable';

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
        enable({
            packageJson: packageJsonPath,
            hooksDirectory: '.githooks',
        }).catch(onError);
        break;
    case ActionDisable:
        disable({
            packageJson: packageJsonPath,
        }).catch(onError);
        break;
    default:
        throw new Error(`UnexpectedAction: ${args.join(' ')}`);
    }
}
