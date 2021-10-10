# For Contributors

Welcome to our project! Before you start contributing please get familiar at
least with [HOWTO contribute](#howto-contribute) section.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119].


## Table of contents
* [HOWTO contribute](#howto-contribute)
* [Proper commit message](#proper-commit-message)
* [Installing requirements](#installing-requirements)


## HOWTO contribute
1. To request changes, a user SHOULD log an issue on [the issue tracker].
2. The user or Contributor SHOULD write the issue by describing the problem they face or observe.
3. Before making changes Contributor SHOULD fork this project.
4. To submit a patch, a Contributor MUST create a pull request back to the project.
5. To submit a patch, a Contributor SHOULD reference the issue in the commit
   message.
6. To submit a patch, the commit message redacted by a Contributor SHOULD be
   compliant with [Conventional Commits
   specification]

(this section was inspired by [ZMQ C4] contract)


## Proper commit message
We stick to [Conventional Commits specification] because [`yarn` generates a
changelog from git commits](https://yarnpkg.com/package/generate-changelog).

If you need examples check [commits on master branch]. If this is still not
enough you can also check [Angular guidelines].


## Installing requirements
Run
```bash
yarn install
```



[RFC 2119]: https://datatracker.ietf.org/doc/html/rfc2119
[the issue tracker]: https://gitlab.com/spio-wyin/wyin-sdk-feed/-/issues
[Conventional Commits specification]: https://www.conventionalcommits.org/en/v1.0.0-beta.2/
[Angular guidelines]: https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines
[ZMQ C4]: https://rfc.zeromq.org/spec/42/
[commits on master branch]: https://gitlab.com/spio-wyin/wyin-sdk-feed/-/commits/master
