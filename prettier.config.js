// eslint.config.mjs
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import tailwindcss from 'eslint-plugin-tailwindcss'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      tailwindcss,
      prettier: prettierPlugin,
    },
    rules: {
      // JS/TS Recommended
      ...(js.configs.recommended?.rules ?? {}),
      ...(tseslint.configs.recommended?.rules ?? {}),
      ...(tseslint.configs['recommended-type-checked']?.rules ?? {}),

      // Custom rules
      'prettier/prettier': 'warn',
      'import/order': ['warn', { 'newlines-between': 'always' }],
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
]
