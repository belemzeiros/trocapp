module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  setupFiles: ['babel-polyfill'],
  setupTestFrameworkScriptFile: './jest.setup.js',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest.mock-file.js',
    '\\.(svg)$': '<rootDir>/jest.mock-svg.js',
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
    '@/(.*)$': '<rootDir>/src/app/$1',
  },
  collectCoverageFrom: [
    'src/**/*js',
    '!src/server/config/logger.js',
    '!src/server/render.js',
    '!src/client/index.js',
  ],
  coverageReporters: ['cobertura', 'lcov', 'json', 'html'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
