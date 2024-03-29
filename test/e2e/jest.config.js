'use strict';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    testMatch: ['<rootDir>/__tests__/**/*.[jt]s?(x)'],
    preset: 'ts-jest',
    globals: { 'ts-jest': { tsconfig: '<rootDir>/../../tsconfig.test.json' } },
    testPathIgnorePatterns: ['.*jest-runner-vscode.config.js'],
    verbose: true,
    modulePathIgnorePatterns: [
        '<rootDir>/../../.vscode-test',
    ],
    // setupFilesAfterEnv: ['<rootDir>/setup.ts'],
    runner: 'vscode',
};

module.exports = config;
