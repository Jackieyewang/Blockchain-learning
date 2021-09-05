const OFF = 0;

module.exports = {
  extends: '../../.eslintrc.js',
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['jest']
};
