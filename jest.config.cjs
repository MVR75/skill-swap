module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'node',
        types: ['jest', 'node', '@testing-library/jest-dom'],
      },
      diagnostics: {
        ignoreCodes: [2307],
      },
    }],
  },
};