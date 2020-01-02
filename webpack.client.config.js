"use struct";

const path = require("path");
const webpack = require("webpack");
const wpMerge = require("webpack-merge");
const common = require("./webpack.config");

const config =
  process.env.NODE_ENV === "production"
    ? require("./webpack.client.prod.config")
    : require("./webpack.client.dev.config");

const base = {
  entry: path.resolve("src", "client", "index.tsx"),
  output: {
    path: path.resolve("dist", "client")
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.IS_BROWSER": JSON.stringify(true)
    })
  ]
};

module.exports = wpMerge.smart(common, base, config);
