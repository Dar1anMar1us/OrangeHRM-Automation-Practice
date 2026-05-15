const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,
  viewportHeight: 860,
  screenshotOnRunFailure: true,
  screenshotQuality: 20, // lower quality, smaller files
  video: false,
  chromeWebSecurity: true,
  includeShadowDom: true,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 0,
  experimentalWebKitSupport: false,
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 1,
    openMode: 0,
  },

  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: true,
      html: true,
      json: true,
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
  },
});
