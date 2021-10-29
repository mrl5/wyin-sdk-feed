module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:mocha/recommended'],
    rules: {
        camelcase: 2,
    },
};
