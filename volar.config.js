const vetur = require('@volar-plugins/vetur');

module.exports = {
  plugins: [
    vetur(),
  ],
  "compilerOptions": {
    "types": ["element-plus/global"]
  }
};