module.exports = {
  coverageDirectory: '<rootDir>/__tests__/coverage',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/__mocks__',
    '<rootDir>/__tests__/coverage/',
    '<rootDir>/node_modules/',
  ],
  collectCoverageFrom: [
    '**/*.js',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
