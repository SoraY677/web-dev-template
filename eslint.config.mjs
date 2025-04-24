import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
    'rules': {
      'no-extra-semi': 'warn',
      'no-undef': 'warn',
      'quotes': ['error', 'single'],
      'space-before-blocks': ['warn', { 'functions': 'always' }]
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  
  tseslint.configs.recommended,
]);
