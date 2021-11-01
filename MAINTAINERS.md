# For Maintainers

This doc is for people with
[Maintainer](https://docs.gitlab.com/ee/user/permissions.html) role.


## Table of contents
* [Merging changes to the project](#merging-changes-to-the-project)
* [Releasing new version](#releasing-new-version)


## Merging changes to the project
We're all good as long as contributing rules described under [`HOWTO
contribute` section in CONTRIBUTING](CONTRIBUTING.md#howto-contribute) are
fulfilled.


## Releasing new version
1. Make sure you configured SSH key for yourself. For more info check
https://docs.gitlab.com/ee/ssh/

2. Run release script:
```bash
./scripts/release.sh
```
How it works:
* it strongly relies on proper commit message format (described in
  [CONTRIBUTING](CONTRIBUTING.md))
* it should properly increment the version that's consistent with [Semantic
  Versioning](https://semver.org/)
* it should update the [CHANGELOG](CHANGELOG.md) based on a subset of commit
  messages
* finally it should push a new branch and a new tag

3. Finally **you need to create a merge request** (from a branch that was created
   and pushed by the script).
