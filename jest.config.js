/** @type {import('jest').Config} */
module.exports = {
  ...require('@3fn/core/jest-preset'),
  roots: ['<rootDir>/src'],
  transformIgnorePatterns: [
    'node_modules/(?!@3fn/core/src/)',
  ],
};
