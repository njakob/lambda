
# lambda [![Build Status][build-status-image]][travis] [![ESLint Config][eslint-config-image]][eslint-config]

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

## Licences

`njakob/lambda` is licensed under the [MIT License][licence].

[licence]: LICENSE
[eslint-config]: https://github.com/njakob/eslint-config
[npm]: https://nodei.co/npm/@njakob/lambda
[travis]: https://travis-ci.org/njakob/lambda
[npm-status-image]: https://img.shields.io/npm/v/@njakob/lambda.svg
[build-status-image]: https://travis-ci.org/njakob/lambda.svg?branch=master
[eslint-config-image]: https://img.shields.io/badge/eslint_config-njakob-463fd4.svg
