
# lambda [![Build Status][badge:build-status]][travis] [![ESLint Config][badge:eslint-config]][github:njakob/eslint-config] [![Conventional Commits][badge:conventional-commits]][conventional-commits]

> Utils to deploy AWS Lambda functions written in Javascript.

## Features

* CLI
* Public API
* Flowtype definition

## Installation

With NPM:

```
$ npm install @njakob/lambda
```

With Yarn:

```
$ yarn add @njakob/lambda
```

## Usage

```json
{
  "name": "mylambda",
  "include": [
    "./build/mylambda.js",
    "./assets/**",
  ]
}
```

```sh
$ AWS_REGION=eu-central-1 lambda deploy --config mylambda.json
```

## Changelog

See [changelog][CHANGELOG].

## Licences

`njakob/lambda` is licensed under the [MIT License][licence].

[changelog]: CHANGELOG.md
[licence]: LICENSE
[npm]: https://nodei.co/npm/@njakob/lambda
[travis]: https://travis-ci.org/njakob/lambda
[conventional-commits]: https://conventionalcommits.org
[github:njakob/eslint-config]: https://github.com/njakob/eslint-config
[badge:npm-status]: https://img.shields.io/npm/v/@njakob/lambda.svg
[badge:build-status]: https://travis-ci.org/njakob/lambda.svg?branch=master
[badge:eslint-config]: https://img.shields.io/badge/eslint_config-njakob-463fd4.svg
[badge:conventional-commits]: https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg
