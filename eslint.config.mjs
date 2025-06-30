import globals from 'globals'
import { defineConfig, globalIgnores  } from 'eslint/config'
import tsParser from "@typescript-eslint/parser";
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import pluginImport from 'eslint-plugin-import'

export default defineConfig([
  /* TypeScript */
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      semi: ['error', 'never'],
      'semi-spacing': ['error', {after: true, before: false}],
      'quote-props': ['error', 'as-needed'],
      'no-extra-semi': 'error',
      'no-undef': 'warn',
      quotes: ['error', 'single'],
      'space-before-blocks': ['error', { functions: 'always' }],
      'semi-style': ['error', 'last'],
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
      'keyword-spacing': ["error", {"before": true, "after": true }],
      'space-infix-ops': 'error',
    },
    languageOptions: { 
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  /* Vue */
  {
    files: ['**/*.{vue}'],
    plugins: {
      vue: pluginVue,
      import: pluginImport,
    },
    languageOptions: {
      parser: vueParser,
      globals: {
        ...globals.node
      },
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: './tsconfig.json',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],
    },
  },

  globalIgnores([
		"**/node_modules/**/*", 
		"**/dist/**/*", 
	]),
])
