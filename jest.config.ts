import type { Config } from 'jest';

const config: Config = {
  rootDir: "./", 
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest"
  },
  clearMocks: true,
  coverageProvider: "v8",
};

export default config;
