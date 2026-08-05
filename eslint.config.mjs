import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: [
            'dist/**',
            'docs/**',
            'node_modules/**',
            // testapp/ is a gitignored scratch app; its compiled output
            // (testapp/index.js) shouldn't be linted alongside real source.
            'testapp/**',
            'coverage/**',
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            // The whole point of the parser layer is turning untyped upstream JSON
            // into typed DTOs, so `any` is used deliberately throughout.
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
        },
    },
    eslintConfigPrettier,
);
