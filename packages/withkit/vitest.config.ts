import { configDefaults, defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	define: {
		'import.meta.vitest': 'undefined'
	},
	test: {
		globals: true,
		environment: 'jsdom',
		includeSource: ['src/**/*.{test,spec}.{js,ts,svelte}'],
		setupFiles: ['./src/test.config.ts'],
		coverage: {
			exclude: ['./src/test.config.ts']
		},
		exclude: [...configDefaults.exclude, 'tests']
	}
});
