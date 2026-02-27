console.log('Loading playwright.config.ts...');
import { defineConfig, devices } from '@playwright/test';
import { config } from './config';

const getLaunchOptions = (browserName: string) => {
  let baseArgs: string[] = [];
  if (browserName === 'chromium') {
    baseArgs = [
      '--disable-web-security',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ];
  } else if (browserName === 'firefox') {
    baseArgs = [
      '--disable-web-security'
    ];
  }

  const windowArgs = (browserName === 'firefox' && !config.browser.headless) ? [] : [
    `--window-position=${config.browser.position.x},${config.browser.position.y}`,
    `--window-size=${config.browser.viewport.width},${config.browser.viewport.height}`
  ];
  return {
    slowMo: config.browser.slowMo,
    args: [...baseArgs, ...windowArgs],
    ignoreDefaultArgs: ['--disable-extensions']
  };
};

const globalUse = {
  actionTimeout: config.timeouts.action,
  navigationTimeout: config.timeouts.navigation,
  headless: config.browser.headless,
  trace: 'on',
  screenshot: 'on',
  video: 'on',
  ignoreHTTPSErrors: true,
  contextOptions: {
    viewport: config.browser.viewport,
    permissions: ['geolocation'],
    geolocation: { longitude: -122.4194, latitude: 37.7749 },
    locale: 'en-US',
    timezoneId: 'America/Los_Angeles'
  }
};

const browserDevices: Record<string, any> = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari']
};

const projects = browserDevices[config.browser.name]
  ? [{ 
      name: config.browser.name, 
      use: { 
        ...globalUse, 
        launchOptions: getLaunchOptions(config.browser.name), 
        ...browserDevices[config.browser.name] 
      } 
    }]
  : [
      { 
        name: 'chromium', 
        use: { 
          ...globalUse, 
          launchOptions: getLaunchOptions('chromium'), 
          ...devices['Desktop Chrome'] 
        } 
      },
      { 
        name: 'firefox', 
        use: { 
          ...globalUse, 
          launchOptions: getLaunchOptions('firefox'), 
          ...devices['Desktop Firefox'] 
        } 
      },
      { 
        name: 'webkit', 
        use: { 
          ...globalUse, 
          launchOptions: getLaunchOptions('webkit'), 
          ...devices['Desktop Safari'] 
        } 
      }
    ];

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  timeout: config.timeouts.global,
  outputDir: 'test-results',
  globalSetup: './playwright.setup.ts',
  globalTeardown: './playwright.teardown.ts',
  fullyParallel: true,
  forbidOnly: !!config.other.ci,
  retries: !!config.other.ci ? 2 : 0,
  workers: !!config.other.ci ? 2 : undefined,
  reporter: [
    ['html', { outputFolder: 'test-reports', open: 'never' }],
    ['json', { outputFile: 'test-reports/index.json' }],
    ['junit', { outputFile: 'test-reports/junit.xml' }]
  ],
  projects
});