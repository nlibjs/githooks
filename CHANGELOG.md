# Changelog

## v0.2.2 (2024-10-14)

### Bug Fixes

- workaround for ELSPROBLEMS ([ae8c1fd](https://github.com/nlibjs/githooks/commit/ae8c1fd9b11a140dcb7355b9dba64a12b273aaea))

### Tests

- use tsm-test ([b78b5f6](https://github.com/nlibjs/githooks/commit/b78b5f6d5395d83716800d63e6c55fe0a20e88a6))
- missing await ([10842d3](https://github.com/nlibjs/githooks/commit/10842d3a5a7bec2cbbb7ef5a5b6f2b0267e87c5b))

### Code Refactoring

- replace statOrNull with ignoreENOENT ([60ab874](https://github.com/nlibjs/githooks/commit/60ab874e234e6b7f0bdee604e0019c846568c2bb))

### Styles

- format ([94d1e1e](https://github.com/nlibjs/githooks/commit/94d1e1ee8be8e1bb8684cd9b959bf74101f11a76))

### Dependency Upgrades

- uninstall @nlib/tsm ([78e9db7](https://github.com/nlibjs/githooks/commit/78e9db7f91849f10487637bb8c00a6d749ae14d1))


## v0.2.1 (2024-10-14)

### Features

- use esm output ([b82480c](https://github.com/nlibjs/githooks/commit/b82480cb0f60ce8b6ce3afe3550c5bd274a01599))

### Tests

- disabling hooks ([7254445](https://github.com/nlibjs/githooks/commit/7254445779916caae5bc871fe1b147ff3aff0e80))
- specify file names ([7e10633](https://github.com/nlibjs/githooks/commit/7e10633d0acae2194608bffb0689a999b7c43537))
- fix ava config ([f27267c](https://github.com/nlibjs/githooks/commit/f27267c2f89c4e95c2b879b5e874653dc3bf395b))

### Code Refactoring

- simplify interfaces ([c7602d8](https://github.com/nlibjs/githooks/commit/c7602d8feecabff15d0d385719ed93463430d9d2))
- merge githooks.mts and cli.mts, uninstall ava ([25bd0fc](https://github.com/nlibjs/githooks/commit/25bd0fc02730fc9a777f0ce18905349daadf134f))

### Styles

- eslint eslint errors ([bf11c96](https://github.com/nlibjs/githooks/commit/bf11c9609fa3ce43984175461ff50e7a79ad18b9))

### Documentation

- update README.md ([4621bfb](https://github.com/nlibjs/githooks/commit/4621bfb831c5250db13232487bee2a07913e9e02))

### Continuous Integration

- restrict branches ([a68ce40](https://github.com/nlibjs/githooks/commit/a68ce4031fe0ea935ded59ab64a4521b9f979462))
- upgrade codecov/codecov-action ([6ce6250](https://github.com/nlibjs/githooks/commit/6ce62506d5b21fbeacc2846d883477af76ecce7d))
- update actions ([58b8015](https://github.com/nlibjs/githooks/commit/58b8015168de3a1017e3d5f1e8d9dcf8d50c227e))
- run npm install with --ignore-scripts ([607b681](https://github.com/nlibjs/githooks/commit/607b681462fafa0f7708545f793302eb48c862c9))
- v2 → v3 ([0e3b401](https://github.com/nlibjs/githooks/commit/0e3b4018372218dca43f935be958f68225257e5e))

### Dependency Upgrades

- @types/node:20.12.4→22.7.5 typescript:5.4.4→5.6.3 ([35ae7d1](https://github.com/nlibjs/githooks/commit/35ae7d15a6236faa6569c04dea6a70041b2bc10b))
- setup biome ([0f0374f](https://github.com/nlibjs/githooks/commit/0f0374f4087b5c1304c3968b61e889ed3a014721))
- @nlib/changelog:0.3.0→0.3.1 ([923e2c9](https://github.com/nlibjs/githooks/commit/923e2c9e51cb49470cb6fac19d83a83fe651d26f))
- @typescript-eslint/eslint-plugin:6.4.1→6.5.0 @typescript-eslint/parser:6.4.1→6.5.0 prettier:3.0.2→3.0.3 ([a7bad66](https://github.com/nlibjs/githooks/commit/a7bad66183e08a26fe0b5baa1efeed2f8ca9f978))
- reinstall packages ([8a2de2f](https://github.com/nlibjs/githooks/commit/8a2de2ffe1fbf43899b62ba0c03ec2a02410e59e))
- @nlib/eslint-config:3.17.28→3.20.1 ([7850882](https://github.com/nlibjs/githooks/commit/7850882571ee23a9e01696fa82c57722b06781b7))
- typescript:4.8.4→5.1.6 ([1c6631b](https://github.com/nlibjs/githooks/commit/1c6631b89fd5120254167e03b36c4b2c24facf25))
- @typescript-eslint/eslint-plugin:4.33.0→6.4.1 @typescript-eslint/parser:4.33.0→6.4.1 ([e8d8242](https://github.com/nlibjs/githooks/commit/e8d8242b250e3e82f401b9e21b14e36eb917faec))
- eslint:7.32.0→8.47.0 ([80375a7](https://github.com/nlibjs/githooks/commit/80375a7fe63bad3aa863354e57c568104ebe09f2))
- lint-staged:11.2.6→14.0.1 ([494810d](https://github.com/nlibjs/githooks/commit/494810d44b541454afb2965efe9f650004568761))
- @types/node:16.7.10→20.5.1 ([c08a240](https://github.com/nlibjs/githooks/commit/c08a24096305c34f3f037205c041c8c2b63e9fc4))
- ava:3.15.0→5.3.1 ([a9a96f4](https://github.com/nlibjs/githooks/commit/a9a96f48f2781c73c0beb9e5b9c08511ae855e3a))


## v0.1.0 (2021-09-05)

### Dependency Upgrades

- reinstall packages ([17c6f34](https://github.com/nlibjs/githooks/commit/17c6f345ec7de58474f6b96cb67a513eefbedff3))
- @nlib/eslint-config:3.17.21→3.17.22 eslint:7.25.0→7.26.0 lint-s… (#30) ([d709668](https://github.com/nlibjs/githooks/commit/d709668ffbaa1792c22bd19de46da828718c0e90))


## v0.0.5 (2021-03-27)

### Continuous Integration

- remove sourcemap ([0843737](https://github.com/nlibjs/githooks/commit/084373707a7236525ce4ce6af78aeea2e3569514))


## v0.0.4 (2021-03-27)

### Bug Fixes

- upgrade nodetool to keep scripts field ([d8d390f](https://github.com/nlibjs/githooks/commit/d8d390fff95fa0145164d8c482d638993d94b476))


## v0.0.3 (2021-03-27)

### Bug Fixes

- ci script ([db3ced8](https://github.com/nlibjs/githooks/commit/db3ced87d94cfd7ff4f51783ec46e8a6e5ee912b))


## v0.0.2 (2021-03-27)

### Features

- add preuninstall script ([aaff038](https://github.com/nlibjs/githooks/commit/aaff03880d2b10bea2bdc5ccf9944c9378ea85cf))


## v0.0.1 (2021-03-27)

### Features

- enable/disable ([feb2a61](https://github.com/nlibjs/githooks/commit/feb2a61d87aa0b51f942bddec461217eb52636a3))
- add enable and disable actions ([55a6245](https://github.com/nlibjs/githooks/commit/55a62454cc17b40277f412b04a27e8b2e6eb36da))
- the first version ([7625d94](https://github.com/nlibjs/githooks/commit/7625d942fa94e9692044c69f2c69b8cdab6136da))

### Bug Fixes

- ci errors (#11) ([cfb11ef](https://github.com/nlibjs/githooks/commit/cfb11ef89e7ef57b31102785bafed3fb4aaa24ff))

### Tests

- update test configuration ([a5690dd](https://github.com/nlibjs/githooks/commit/a5690dd0ef51c2e82d0addc68d86adbc7a4e83d4))

### Code Refactoring

- move some codes for testing (#12) ([f91ebfb](https://github.com/nlibjs/githooks/commit/f91ebfb556bb1f4fd207e51ea1baf3eabec75468))

### Documentation

- add README and LICENSE ([58965e3](https://github.com/nlibjs/githooks/commit/58965e34d050fdc66ea6b5e66e0438c139dcff2e))

### Continuous Integration

- run npm install with --ignore-scripts ([9ffd10c](https://github.com/nlibjs/githooks/commit/9ffd10c9835d6d25fe55764ade9828639e841c84))

### Dependency Upgrades

- @types/node:14.14.34→14.14.37 @typescript-eslint/eslint-plugin:4.17.0→4.19.0 @typescript-eslint/parser:4.17.0→4.19.0 eslint:7.22.0→7.23.0 ([8f37fe5](https://github.com/nlibjs/githooks/commit/8f37fe531d3ca1ef9a3a2471d15445aba9495cf7))
- @nlib/eslint-config:3.17.18→3.17.20 @types/node:14.14.25→14.14.34 @typescript-eslint/eslint-plugin:4.15.0→4.17.0 @typescript-eslint/parser:4.15.0→4.17.0 eslint:7.19.0→7.22.0 typescript:4.1.5→4.2.3 ([07cd056](https://github.com/nlibjs/githooks/commit/07cd05675e7d9bc76e308306e8f282e350dbc4be))


