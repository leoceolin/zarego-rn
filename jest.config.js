module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/src/jest/setup.ts'],
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)/'],
}
