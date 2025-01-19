module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    reporters: [
      'default', // This is the default reporter
      ['jest-html-reporter', {
        pageTitle: 'Test Report', // Title of the report page
        outputPath: './test-report.html', // Path where the report will be generated
        includeFailureMsg: true, // Include failure message
        includeConsoleLog: true, // Include console logs in the report
      }]
    ],
  };