# Change Log

All notable changes to the Ansible VS Code extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2021-08-10
### Fixed
- The configuration file for Ansible Lint is now identified by going up the
  directory structure, starting from the investigated file, and taking the first
  `.ansible-lint` file encountered. This effectively mimics the algorithm
  implemented natively in the linter, while still executing it from the root
  folder of the workspace.

## [1.0.5] - 2021-08-08
### Fixed
- Files with CRLF line endings will now display and behave correctly. No more
  weirdly offset highlighting and interactions.

## [1.0.4] - 2021-08-04
### Fixed
- Paths with special characters are now correctly handled. Both in case of
  workspace path and in case of files in workspace.

### Changed
- Now encouraging to install `yamllint` as it has been tested and it provides
  useful additional advice on YAML files.

## [1.0.3] - 2021-07-27
### Changed
- Error handling in case output from Ansible Lint can't be parsed is now more
  informative. Contextual information is now logged in `Ansible Server` output.

## [1.0.2] - 2021-07-19
### Fixed
- Modules from pre-installed Ansible collections will now be resolved when using
  the extension in an environment that also has Python 2 installed.
- The cause of the `invalid syntax` error shown on startup has been removed.

## [1.0.1] - 2021-07-15
### Fixed
- Documentation fragments are now also correctly processed in case only one is
  provided, using YAML flow style. The `file` module is a prominent example.

## [1.0.0] - 2021-07-14
- Initial release
