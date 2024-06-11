module.exports = {
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js', '<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
}
