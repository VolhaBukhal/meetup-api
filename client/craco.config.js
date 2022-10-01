/* eslint-disable */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
    },
  },
};
