# @nlib/githooks

A command to enable/disable git hooks scripts in `repository/.githooks`.

![Test](https://github.com/nlibjs/githooks/workflows/Test/badge.svg)
[![codecov](https://codecov.io/gh/nlibjs/githooks/branch/master/graph/badge.svg)](https://codecov.io/gh/nlibjs/githooks)

## Usage

Install `@nlib/githooks` with the `--save-dev` flag.

```
npm install --save-dev @nlib/githooks
```

That's all. If `@nlib/githooks` is installed as the direct devDependency (listed in the package.json), it configures git hooks automatically.

Then, your scripts in `repository/.githooks` are now recognized by git.

*Note: Don't forget to run `chmod +x .githooks/your-script`.*
