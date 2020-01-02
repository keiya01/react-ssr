"use strict";

const webpack = require("webpack");
const DotEnv = require("dotenv-webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");

module.exports = {
  output: {
    filename: "[name].bundle.js",
    publicPath: "/public/"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new DotEnv({
      path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev"
    }),
    new CaseSensitivePathsPlugin(),
    new ForkTSCheckerPlugin(),
    new LoadablePlugin()
  ]
};
