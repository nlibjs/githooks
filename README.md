# @nlib/githooks

## Retirement notice

Feature development and compatibility maintenance have ended.
The repository will stay open for migration questions during the transition.
No further releases are planned. New projects should use an explicit Git setup command
instead of installing this package.

`@nlib/githooks` enabled scripts in `repository/.githooks` by setting Git's
`core.hooksPath` during its npm `postinstall` script.

We support the security-driven move away from npm scripts for automatic
setup. Each developer should explicitly configure Git hooks with a Git command
in their own checkout. Automatic setup during dependency installation was the
purpose of this package; without it, the package no longer provides value.
For that reason, we are retiring it rather than adding install-script approvals
or another npm lifecycle integration.

The existing package versions remain available. This retirement does not
disable hooks in repositories that already configured them.

## Migrate without changing your hooks

Run these commands from the root of the Git repository that uses this package:

```sh
npm uninstall --ignore-scripts @nlib/githooks
git config --local core.hooksPath .githooks
git config --local --get core.hooksPath
```

The final command should print `.githooks`. Keep the `.githooks` directory and
its scripts, and commit the dependency removal in `package.json` and
`package-lock.json`. Remove any `githooks-cli` calls from project scripts or
setup instructions. If you approved this package's install scripts, remove its
entry from the consuming project's `allowScripts` configuration as well.

`--ignore-scripts` skips lifecycle scripts during dependency removal.
Do not use `githooks-cli disable` for this migration: it also unsets
`core.hooksPath`.

Git configuration is local to each checkout. Add the following explicit step
to your contributor setup instructions and run it after each new clone:

```sh
git config --local core.hooksPath .githooks
```

Each developer should run this Git command directly. Do not add it to npm
lifecycle scripts.

On systems that require it, make your hook scripts executable and commit the
executable bit, for example:

```sh
chmod +x .githooks/pre-commit
```

This setup selects `.githooks` instead of other hook directories. If you use
another hook manager, follow that manager's setup instructions instead.

## Stop using these hooks entirely

First inspect the current local setting:

```sh
git config --local --get core.hooksPath
```

If it is `.githooks` and you want to stop using it, remove the package and unset
the setting:

```sh
npm uninstall --ignore-scripts @nlib/githooks
git config --local --unset core.hooksPath
```

Do not unset a setting belonging to another hook manager. Unsetting the local
value restores Git's normal configuration resolution, which may use a global
hook path or `.git/hooks`; it does not necessarily disable all Git hooks.
Delete `.githooks` only if you no longer need its scripts.

## Retirement process

See [RETIREMENT.md](RETIREMENT.md) for the staged retirement checklist.
Published versions and Git history will remain available after archival.

## References

- [Git hook documentation](https://git-scm.com/docs/githooks)
- [npm install-script approvals](https://docs.npmjs.com/cli/v12/commands/npm-install-scripts/)
- [npm lifecycle scripts and the removal of uninstall scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts/)

## License

Apache-2.0. See [LICENSE.txt](LICENSE.txt).
