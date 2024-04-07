// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/styleMock.js",
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};