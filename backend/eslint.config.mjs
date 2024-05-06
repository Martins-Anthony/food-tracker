import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    plugins: ['prettier'],
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
]
