// eslint.config.mjs
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import tailwindcss from 'eslint-plugin-tailwindcss'
import prettierPlugin from 'eslint-plugin-prettier'


const jsRules = js.configs?.recommended?.rules ?? {}
const tsRules = tseslint.configs?.recommended?.rules ?? {}
const tsTypeCheckedRules = tseslint.configs?.['recommended-type-checked']?.rules ?? {}

export default [
  {
    ignores: ['.next/', 'node_modules/', 'public/', 'dist/', '.vercel/'],
  },
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
    settings: {
      tailwindcss: {
        cssFiles: ['app/styles/globals.css'],
        callees: ['cn', 'cva'],
      },
    },
    rules: {
      ...jsRules,
      ...tsRules,
      ...tsTypeCheckedRules,

      // Formatting
      'prettier/prettier': 'warn',

      // Import sorting
      // Import sorting - Temporarily disabled due to crash in eslint-plugin-import with ESLint 10
      'import/order': 'off',

      // Tailwind CSS
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
]
