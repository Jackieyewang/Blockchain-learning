# idx-common

This is the repository for shared idx schemas, definitions and related codes for the DataDiDi project.

## Get started

### Prerequisites

- node@^15
- yarn@^1.22

### Install dependencies

```bash
yarn
```

### Set env variables

Set the environmental variables in the `.env` file.

### Local Development

You can run your own local ceramic node with the following steps:

```bash
> yarn global add @ceramicnetwork/cli
> ceramic daemon
```

## Publish schemas and definitions

To publish the JSON schemas in `schemas` run

```bash
yarn idx:publish
```

This will publish them to the configured ceramic node and update the doc ids.

## Tests

```bash
yarn test
```

## Copyrights

Many thanks to the [Kontext](https://github.com/kontext-app) project for providing easy-to-use schemas and definitios for storing bookmarks.