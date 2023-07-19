---
title: Svelte Kit
sidebar_position: 3
---

# Svelte Kit (Unit Testing)

## Testing Dependencies

```bash
#
pnpm install -D  @vitest/ui @vitest/coverage-c8
#
pnpm install -D @testing-library/svelte @testing-library/user-event jsdom @sveltejs/vite-plugin-svelte
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

```ts title="vitest.config.ts"
import { configDefaults, defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  define: {
    "import.meta.vitest": "undefined",
  },
  test: {
    globals: true,
    environment: "jsdom",
    includeSource: ["src/**/*.{test,spec}.{js,ts,svelte}"],
    setupFiles: ["./src/test.config.ts"],
    coverage: {
      exclude: ["./src/test.config.ts"],
    },
    exclude: [...configDefaults.exclude, "tests"],
  },
});
```

```ts title="./src/test.config.ts"
import matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";
import { readable } from "svelte/store";
import type * as environments from "$app/environment";
import type * as navigation from "$app/navigation";
import type * as stores from "$app/stores";
import type { Navigation, Page } from "@sveltejs/kit";
expect.extend(matchers);

vi.mock("$app/environment", (): typeof environments => ({
  browser: false,
  dev: true,
  building: false,
  version: "any",
}));

// Mock SvelteKit runtime module $app/navigation
vi.mock("$app/navigation", (): typeof navigation => ({
  afterNavigate: () => {},
  beforeNavigate: () => {},
  disableScrollHandling: () => {},
  goto: () => Promise.resolve(),
  invalidate: () => Promise.resolve(),
  invalidateAll: () => Promise.resolve(),
  preloadData: () => Promise.resolve(),
  preloadCode: () => Promise.resolve(),
}));

// Mock SvelteKit runtime module $app/stores
vi.mock("$app/stores", (): typeof stores => {
  const getStores: typeof stores.getStores = () => {
    const navigating = readable<Navigation | null>(null);
    const page = readable<Page>({
      url: new URL("http://localhost"),
      params: {},
      route: {
        id: null,
      },
      status: 200,
      error: null,
      data: {},
      form: undefined,
    });
    const updated = {
      subscribe: readable(false).subscribe,
      check: async () => false,
    };

    return { navigating, page, updated };
  };

  const page: typeof stores.page = {
    subscribe(fn) {
      return getStores().page.subscribe(fn);
    },
  };
  const navigating: typeof stores.navigating = {
    subscribe(fn) {
      return getStores().navigating.subscribe(fn);
    },
  };
  const updated: typeof stores.updated = {
    subscribe(fn) {
      return getStores().updated.subscribe(fn);
    },
    check: async () => false,
  };

  return {
    getStores,
    navigating,
    page,
    updated,
  };
});
```
