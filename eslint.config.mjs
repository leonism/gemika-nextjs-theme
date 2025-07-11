// eslint.config.mjs
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import tailwindcss from 'eslint-plugin-tailwindcss'
import prettierPlugin from 'eslint-plugin-prettier'

console.log('👀 DEBUGGING: js.configs.recommended:', js.configs?.recommended)
console.log('👀 DEBUGGING: tseslint.configs:', tseslint.configs)

const jsRules = js.configs?.recommended?.rules ?? {}
const tsRules = tseslint.configs?.recommended?.rules ?? {}
const tsTypeCheckedRules = tseslint.configs?.['recommended-type-checked']?.rules ?? {}

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
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        // Add more browser or Node globals if needed
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      tailwindcss,
      prettier: prettierPlugin,
    },
    rules: {
      ...jsRules,
      ...tsRules,
      ...tsTypeCheckedRules,

      // Formatting
      'prettier/prettier': 'warn',

      // Import sorting
      'import/order': ['warn', { 'newlines-between': 'always' }],

      // Tailwind CSS
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
]
