---
title: Only Svelte
sidebar_position: 2
---

# Only Svelte (Unit Testing)

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

TODO Explain what was installed

append to `pacakge.json` scripts

```json
"scripts": {
  "test": "vitest --ui"
}
```
