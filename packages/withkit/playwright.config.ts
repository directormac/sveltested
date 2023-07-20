import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm build && pnpm preview',
		port: 4173
	},
	fullyParallel: true,
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		trace: 'on-first-retry'
	}
};

export default config;
