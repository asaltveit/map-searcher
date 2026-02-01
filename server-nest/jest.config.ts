import type { Config } from 'jest';

const config: Config = {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest',

  // Node environment for backend testing
  testEnvironment: 'node',

  // Test file patterns - ONLY run unit tests (*.spec.ts in src/)
  // E2E tests require ESM configuration which is complex with Jest
  testMatch: ['<rootDir>/src/**/*.spec.ts'],

  // File extensions to consider
  moduleFileExtensions: ['ts', 'mjs', 'js', 'json'],

  // Setup file to load before tests
  setupFiles: ['<rootDir>/test/setup-env.ts'],

  // Transform configuration
  // Use ts-jest for TypeScript, babel-jest for ESM .mjs files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.mjs$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
        ],
      },
    ],
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.dto.ts',
  ],
  coverageDirectory: 'coverage',

  // Root directory for tests
  rootDir: '.',

  // Module path mapping
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  // Transform ALL node_modules ESM packages
  transformIgnorePatterns: [],

  // Verbose output for better debugging
  verbose: true,

  // Force Jest to exit after tests complete (prevents hanging on open handles)
  forceExit: true,
};

export default config;
