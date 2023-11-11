// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('cypress');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

interface Urls {
  local: string,
  staging: string,
  prod: string
}

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on: any, config: any) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);

      const env = config.env.environment || 'local';
      const urls: Urls  = {
        local: 'http://localhost:4200',
        staging: 'https://staging.example.com',
        prod: 'https://example.com',
      };
      config.baseUrl = urls[env as keyof Urls];
      return config;
    },

    specPattern: 'cypress/e2e/**/*.feature',
    testIsolation: false,
    video: false,
  },
});
