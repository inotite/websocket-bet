module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
      "@typescript-eslint/explicit-function-return-type": 'off',
      "@typescript-eslint/no-explicit-any": ["warn",{ "ignoreRestArgs": true }],
      "@typescript-eslint/camelcase": 'off',
      "@typescript-eslint/no-empty-interface": 'off',
      "@typescript-eslint/no-non-null-assertion": 'off',
      "@typescript-eslint/interface-name-prefix": 'off',
    }
  }