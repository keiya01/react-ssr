"use strict";

const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const PWAManifestPlugin = require("webpack-pwa-manifest");
const workbox = require("workbox-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].[id].bundle.js"
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new ManifestPlugin(),
    new PWAManifestPlugin({
      filename: "manifest.webmanifest",
      name: "react-ssr",
      short_name: "react-ssr",
      theme_color: "#555",
      crossorigin: "use-credentials",
      background_color: "#fff",
      description: "This is react-ssr template",
      icons: []
    }),
    new workbox.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      include: [/\.js$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp("."), // for start_url
          handler: "StaleWhileRevalidate"
        },
        {
          urlPattern: new RegExp("api"),
          handler: "NetworkFirst"
        },
        {
          urlPattern: new RegExp(
            "https://fonts.googleapis.com|https://fonts.gstatic.com"
          ),
          handler: "CacheFirst"
        }
      ]
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false
    })
  ],
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
};
