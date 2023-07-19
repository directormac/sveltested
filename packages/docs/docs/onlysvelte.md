---
title: Only Svelte
sidebar_position: 2
---

# Only Svelte (Unit Testing)

## Scaffold project with `create vite`

```bash
pnpm create vite
```

```bash
cd intoYourProject && pnpm install
```

```bash
# test run
pnpm dev
```

> Select Svelte and Typescript

Now test lets install what we need first things first
we want linters and formatters!!!!

We will install eslint first with the following commands

```bash
# ESLint and type definitions
pnpm install -D eslint eslint-plugin-svelte @typescript-eslint/eslint-plugin @typescript-eslint/parser
# Prettier and type definitions
pnpm install -D prettier prettier-plugin-svelte eslint-config-prettier
```

After that we need to create our `.prettierignore` `.eslintignore` and `eslintrc.cjs`

`.prettierignore` and `eslintignore` files have the same content

```prettierignore
.DS_Store
node_modules
/build
/package
.env
.env.*
!.env.example

# Ignore files for PNPM, NPM and YARN
pnpm-lock.yaml
package-lock.json
yarn.lock
```

```js
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
};
```

## Testing Dependencies

```bash
#
pnpm install -D vitest @vitest/ui @vitest/coverage-c8
#
pnpm install -D @testing-library/svelte @testing-library/user-event jsdom
#
pnpm install -D @testing-library/jest-dom @types/testing-library__jest-dom
# Extras might be depreciated
pnpm install -D svelte-htm svelte-fragment-component
```

append to `pacakge.json` scripts

```json
"scripts": {
    "lint": "prettier --plugin-search-dir . --check . && eslint .",
	"format": "prettier --plugin-search-dir . --write .",
  "test": "vitest --ui"
}
```
