# @nlib/githooks

A command to enable/disable git hooks scripts in `repository/.githooks`.

[![Test](https://github.com/nlibjs/githooks/actions/workflows/test.yml/badge.svg)](https://github.com/nlibjs/githooks/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/nlibjs/githooks/branch/master/graph/badge.svg)](https://codecov.io/gh/nlibjs/githooks)

## Usage

Install `@nlib/githooks` with the `--save-dev` flag.

```
npm install --save-dev @nlib/githooks
```

That's all. If `@nlib/githooks` is installed as the direct devDependency (listed in the package.json), it configures git hooks automatically.

Then, your scripts in `repository/.githooks` are now recognized by git.

*Note: Don't forget to run `chmod +x .githooks/your-script`.*

## Uninstalling

`<0.1.x` reverts the installation on uninstalling of this package. But [uninstall lifecycle scripts were removed](https://docs.npmjs.com/cli/v7/using-npm/scripts#a-note-on-a-lack-of-npm-uninstall-scripts) in npm@7, `>0.1.x` do nothing on uninstalling of this package.

If you want to revert the configuration, please follow the steps below.

1. Run `git config --local --unset core.hooksPath`
2. Delete the `.githooks`
