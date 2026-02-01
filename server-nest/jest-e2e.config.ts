import type { Config } from 'jest';

/**
 * Jest E2E configuration
 *
 * Uses babel-jest to handle TypeScript and ESM packages consistently
 */
const config: Config = {
  // Node environment for backend testing
  testEnvironment: 'node',

  // E2E test file patterns
  testMatch: ['<rootDir>/test/**/*.e2e-spec.ts'],

  // File extensions to consider
  moduleFileExtensions: ['ts', 'mjs', 'js', 'json'],

  // Setup file to load before tests
  setupFiles: ['<rootDir>/test/setup-env.ts'],

  // Transform TypeScript with ts-jest, ESM .mjs with babel-jest
  // This mirrors the unit test config but handles ESM packages
  transform: {
    // TypeScript files use ts-jest (handles decorators properly)
    '^.+\\.ts$': 'ts-jest',
    // ESM .js and .mjs files use babel-jest with private methods support
    '^.+\\.(mjs|js)$': [
      'babel-jest',
      {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        plugins: [
          ['@babel/plugin-transform-class-properties', { loose: true }],
          ['@babel/plugin-transform-private-methods', { loose: true }],
        ],
      },
    ],
  },

  // Root directory
  rootDir: '.',

  // Root directory for test files
  roots: ['<rootDir>'],

  // Module path mapping
  moduleNameMapper: {
    // Handle .js extension imports (ESM style)
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // src alias mapping
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  // Transform ALL node_modules ESM packages
  // Empty array means nothing is ignored - all files are transformed
  // This matches the unit test config approach
  transformIgnorePatterns: [],

  // Verbose output
  verbose: true,

  // Force Jest to exit after tests complete
  forceExit: true,

  // Increase timeout for E2E tests
  testTimeout: 30000,
};

export default config;
