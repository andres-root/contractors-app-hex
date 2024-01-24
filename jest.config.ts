import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js", "**/tests/**/*.test.ts", "**/tests/**/*.spec.js", "**/tests/**/*.spec.ts"],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};

export default config;
