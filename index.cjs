const fs = require('fs');
const path = require('path');
const console = require('console');
const process = require('process');
const childProcess = require('child_process');

try {
    if (!fs.statSync(path.join(__dirname, 'cjs/githooks.js')).isFile()) {
        throw new Error('RequireBuild');
    }
} catch (_error) {
    childProcess.execSync('npm run build');
}

if (require.main === module) {
    const {githooks} = require('./cjs/githooks');
    githooks(process.argv.slice(2)).catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
