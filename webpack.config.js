const path = require("path")

module.exports = {
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@navigations": path.resolve(__dirname, "src/navigations"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@models": path.resolve(__dirname, "src/models"),
      "@domain": path.resolve(__dirname, "src/domain"),
      "@types": path.resolve(__dirname, "src/types"),
    }
  }
}
