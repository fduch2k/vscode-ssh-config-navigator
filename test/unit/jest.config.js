'use strict';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    rootDir: '../..',
    testMatch: ['<rootDir>/test/unit/__tests__/**/*.[jt]s?(x)'],
    preset: 'ts-jest',
    globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.test.json' } },
    verbose: true,
    collectCoverage: true,
    maxWorkers: 2,
};

module.exports = config;
