"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    "webpack-hot-middleware/client",
    path.resolve("src", "client", "index.tsx")
  ],
  mode: "development",
  devtool: "inline-cheap-module-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
