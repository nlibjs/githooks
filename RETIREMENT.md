# Retirement plan

## Reason and scope

We support avoiding npm scripts for automatic setup on security grounds.
Each developer should configure Git hooks directly with a Git command.
Automatic setup was the purpose of this package, so we are retiring it.

Existing published versions and Git history will remain available.
Do not unpublish the package or publish a replacement version that disables
hooks, fails installation, or introduces a new install-time warning script.
Retirement does not change Git settings in existing consumer checkouts.

## Phase 1: Publish the migration notice

- Merge the retirement notice and link to the official Git hook documentation.
- Disable Renovate and remove the automated npm publication workflow.
- Keep the repository open for retirement-related questions.
- Record the notice publication date below.

Notice publication date: pending merge.

The transition starts when the notice is merged, not when this plan is drafted.

## Phase 2: Mark the npm package deprecated

After the migration notice is public, a maintainer with npm package access
should mark all published versions deprecated:

```sh
npm deprecate '@nlib/githooks@*' 'This package is no longer maintained. For Git hook configuration, see https://git-scm.com/docs/githooks. Retirement notice: https://github.com/nlibjs/githooks#retirement-notice'
```

This changes registry metadata; it does not require a new release or execute
code in consumer repositories. Check the deprecation message on representative
old versions as well as the latest published version.

Deprecation date: pending.

## Phase 3: Migrate known consumers

- Inventory known repositories that depend on this package, including direct
  dependencies, npm scripts invoking `githooks-cli`, and setup documentation.
  Record the inventory and migration status in the tracking table below.
- Remove the dependency with lifecycle scripts disabled, update the lockfile,
  and remove obsolete `allowScripts` entries if present.
- Retain existing hook scripts and their executable bits.
- Link to the official Git hook documentation in contributor documentation.
  Do not reproduce Git setup commands or maintain a separate configuration guide.
  Each developer is responsible for configuring their own checkout.
- Verify the selected hook path and run the repository's normal hook checks.
  Exercise Git hook invocation in a disposable checkout where practical.
- For repositories using another hook manager, preserve that manager's setup.
- Handle retirement-related questions during the transition. Refer Git
  configuration questions to the official documentation.

Public code search is not a complete consumer inventory. Private users and
unindexed repositories may exist; do not claim that every user has migrated.

| Known consumer | Migration change | Verified | Remaining work |
| --- | --- | --- | --- |
| [nlibjs/lint-commit](https://github.com/nlibjs/lint-commit) | Pending | Direct devDependency 0.2.2 confirmed | Remove dependency, update setup docs, verify hooks |
| [nlibjs/indexen](https://github.com/nlibjs/indexen) | Pending | Direct devDependency 0.2.2 confirmed | Remove dependency, update setup docs, verify hooks |
| [nlibjs/cleanup-package-json](https://github.com/nlibjs/cleanup-package-json) | Pending | Direct devDependency 0.2.2 confirmed | Remove dependency, update setup docs, verify hooks |
| [nlibjs/esmify](https://github.com/nlibjs/esmify) | Pending | Direct devDependency 0.2.2 confirmed | Remove dependency, update setup docs, verify hooks |

Initial inventory checked on 2026-10-11 (Asia/Tokyo). These four repositories
were found by organization code search and confirmed against their current
package.json files; the list is not exhaustive.

## Phase 4: Archive after the transition

Allow at least 30 days after publishing the notice before reviewing archival.
Archive only after known consumer migrations are complete and outstanding
retirement-related questions have been handled. Extend the transition if needed.

Before archival:

- Confirm npm deprecation is visible and links to the migration notice.
- Close obsolete automated dependency PRs with the retirement reason.
- Review any migration issues or human PRs individually.
- Review publishing credentials. Remove a repository-specific `NPM_TOKEN`
  secret and revoke its token only after confirming it is not shared by other
  packages or repositories.
- Confirm README, the official Git documentation link, license, and Git history
  are present.
- Record the archival date and archive the repository.

Archival date: pending readiness review.

The package stays downloadable; GitHub becomes a read-only reference.
No consumer settings or hook files are deleted as part of archival.
