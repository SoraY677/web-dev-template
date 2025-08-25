import eslint from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginImport from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import importPlugin from 'eslint-plugin-import'

const pathGroups = [
  {
    pattern: '{@common/**,@configs/**,@assets/**,}',
    group: 'parent',
    position: 'after',
  },
  {
    pattern: '{@components/**,@composables/**,@type/**,@usecases/**,}',
    group: 'parent',
    position: 'after',
  },
  {
    pattern: '{@/**,}',
    group: 'parent',
    position: 'after',
  },
]

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
      },
    },
    rules: {
      'prefer-const': 'error',
      'semi-spacing': 'error',
      'semi-style': 'error',
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'quote-props': ['error', 'as-needed'],
      'no-undef': 'warn',
      'quotes': ['error', 'single'],
      'space-before-blocks': ['error', { functions: 'always' }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'error',
      'array-bracket-spacing': 'error',
      'block-spacing': 'error',
      'brace-style': 'error',
      'camelcase': 'error',
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
      '@stylistic/brace-style': 'off',
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'pathGroups': pathGroups,
          'pathGroupsExcludedImportTypes': ['builtin'],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  /* Vue */
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
      import: pluginImport,
    },
    languageOptions: {
      parser: vueParser,
      globals: {
        ...globals.node,
      },
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: './tsconfig.json',
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'pathGroups': pathGroups,
          'pathGroupsExcludedImportTypes': ['builtin'],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'semi': ['error', 'never'],
    },
  },

  globalIgnores([
    '**/*.js',
    '**/node_modules/**/*',
    '**/dist/**/*',
    '**/cdk.out/**/*',
    '**/vite.config.ts',
  ]),
])
