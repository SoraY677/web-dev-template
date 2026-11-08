import eslint from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'


export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  stylisticPlugin.configs.recommended,
  /* TypeScript */
  {
    files: ['**/*.ts'],
    plugins: {
      '@stylistic': stylisticPlugin,
      'import': importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.jest,
        window: true,
        vi: true,
      },
    },
    rules: {
      'prefer-const': 'error',
      'semi-spacing': 'error',
      'semi-style': 'error',
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-console': ['error'],
      'quote-props': ['error', 'as-needed'],
      'no-undef': 'warn',
      'quotes': ['error', 'single'],
      'space-before-blocks': ['error', { functions: 'always' }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'off',
      'array-bracket-spacing': 'error',
      'block-spacing': 'error',
      'brace-style': 'error',
      'camelcase': 'off',
      'comma-spacing': 'error',
      'comma-style': 'error',
      'computed-property-spacing': 'error',
      'consistent-this': 'error',
      'indent': ['error', 2],
      'key-spacing': 'error',
      'lines-around-comment': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multiple-empty-lines': 'error',
      'no-nested-ternary': 'error',
      'no-trailing-spaces': 'error',
      'operator-linebreak': 'error',
      'sort-vars': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      '@stylistic/indent': 'off',
      '@stylistic/brace-style': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
  prettierConfig,
  globalIgnores([
    '**/*.js',
    '**/node_modules/**/*',
    '**/dist/**/*',
    '**/cdk.out/**/*',
    '**/vite.config.ts',
  ]),
])
