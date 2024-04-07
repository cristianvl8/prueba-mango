// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>src/tests/styleMock.js",
    },
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
};