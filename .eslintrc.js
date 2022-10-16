module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
    // 让define不报错
    //'define' is not defined.eslintno-undef
    amd: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
  },
};
