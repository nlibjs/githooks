# @nlib/githooks

A command to enable/disable git hooks scripts in `repository/.githooks`.

[![Test](https://github.com/nlibjs/githooks/actions/workflows/test.yml/badge.svg)](https://github.com/nlibjs/githooks/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/nlibjs/githooks/branch/master/graph/badge.svg)](https://codecov.io/gh/nlibjs/githooks)

## Usage

Install `@nlib/githooks` with `--save-dev` flag.

```
npm install --save-dev @nlib/githooks
```

That's all. If `@nlib/githooks` is installed as the direct devDependency
(listed in the package.json), it configures git hooks automatically.

Then, your scripts in `.githooks` are now recognized by git.

*Note: Don't forget to run `chmod +x .githooks/your-script`.*

## How it works

This package sets the `core.hooksPath` configuration to `.githooks`:

```sh
git config --local core.hooksPath .githooks
```

> Q. Why do I need this package?
> Can't I just add `git config --local core.hooksPath .githooks` to the
> `postinstall` script in `package.json`?

A. You could do that. However, if you're the author of a package, the
`postinstall` script would also run for anyone who installs your package.
This means your `git hooks` configuration would be applied to their repository
as well, which may not be what you want.
By using this package as a devDependency, you ensure that the configuration is
applied only in your own project and not propagated to others who install your
package.

## Uninstalling

`<0.1.x` reverts the installation on uninstalling of this package. But [uninstall lifecycle scripts were removed](https://docs.npmjs.com/cli/v7/using-npm/scripts#a-note-on-a-lack-of-npm-uninstall-scripts) in npm@7, `>0.1.x` do nothing on uninstalling of this package.

If you want to revert the configuration, please follow the steps below.

1. Run `git config --local --unset core.hooksPath`
2. Delete the `.githooks`
