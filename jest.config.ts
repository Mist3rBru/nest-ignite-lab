import { type Config } from 'jest'

const config: Config = {
  bail: true,
  roots: ['<rootDir>/__tests__'],
  clearMocks: true,
  maxWorkers: 1,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*config*'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: {
          exclude: ['**'],
        },
      },
    ],
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/__tests__/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['mock*'],
}

export default config
