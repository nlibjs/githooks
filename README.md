# @nlib/githooks

## Retirement notice

Feature development and compatibility maintenance have ended.
The repository will stay open for retirement-related questions during the transition.
No further releases are planned.

This package automatically configured Git hooks through npm's `postinstall`
script. We support avoiding npm scripts for automatic setup on security grounds
and believe each developer should configure Git hooks explicitly using Git.
Without automatic setup, this package no longer provides value, so we are
retiring it.

For background on npm's install-time script policy, see the
[official announcement of npm 12's install-time security defaults](https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/)
and the [npm install-script approval documentation](https://docs.npmjs.com/cli/v12/commands/npm-install-scripts/).

Existing published versions and Git history will remain available.

## Git hooks

For Git hook configuration, refer to the
[official Git documentation](https://git-scm.com/docs/githooks).

## License

Apache-2.0. See [LICENSE.txt](LICENSE.txt).
