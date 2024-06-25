module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  globals: {
    "NodeJS": true
  },
  parser: 'vue-eslint-parser',
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  plugins: ['vue'],
  extends: [
    'eslint:recommended',
    "plugin:vue/vue3-recommended",
  ],
  rules: {
    "no-unused-vars": "off",
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    "vue/attribute-hyphenation": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/max-attributes-per-line": ["warn", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "always"
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "any",
        "normal": "any",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    "vue/attributes-order": "error"
  }
}
