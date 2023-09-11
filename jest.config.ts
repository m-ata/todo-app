import type { Config } from 'jest';

const config: Config = {
  displayName: 'Todo App',
  preset: 'ts-jest',
  coverageDirectory: './__tests__/coverage',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  transform: {
    '(/__tests__/.*|(\\.|/)(test))\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    // module mapper which is used in vite.config.ts
    '^@/(.*)$': `${__dirname}/src/$1`,
    '^@components/(.*)$': `${__dirname}/src/components/$1`,
    '^@pages/(.*)$': `${__dirname}/src/pages/$1`,
    '^@interfaces/(.*)$': `${__dirname}/src/interfaces/$1`,
    '^@redux/(.*)$': `${__dirname}/src/redux/$1`,
    '^@utils/(.*)$': `${__dirname}/src/utils/$1`,
    '^@hooks/(.*)$': `${__dirname}/src/hooks/$1`,
    '\\.(svg)$': `${__dirname}/__tests__/mock/file-mock.ts`,
    '\\.(scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [`${__dirname}/setupTests.ts`],
  testPathIgnorePatterns: [
    '/node_modules/',
    // ignore this mock file since it is used for svgs imports in jest
    '/__tests__/mock/file-mock.ts',
  ],
};

export default config;
