module.exports = {
  'preset': 'react-native',
  'setupFilesAfterEnv': ['@testing-library/jest-native/extend-expect'],
  'transformIgnorePatterns': [
    'node_modules/(?!react-native|@react-native|@react-navigation|react-navigation)',
  ],
  'globals': {
    '__DEV__': true,
  },
  'setupFiles': ['./jest.config.js'],
};
