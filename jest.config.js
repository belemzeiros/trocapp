module.exports = {
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!**/tmp/**',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/config/**',
    '!**/public/**',
  ],
  testPathIgnorePatterns: [
    '/tmp/',
    '/mock/',
    '/coverage/',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'html', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
