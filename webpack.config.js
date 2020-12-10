const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  console.log("env: ", env);
  return {
    entry: env.production ? "./src/index.ts" : "./demo/index.ts",
    devServer: {
      contentBase: [path.join(__dirname, "demo"), path.join(__dirname, "dist")],
      compress: true,
      port: 9000,
      open: "http://localhost:9000",
    },
    /**
     * Issue with a version of source-map-support
     * https://github.com/evanw/node-source-map-support/issues/155
     */
    node: {
      fs: "empty",
      module: "empty",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, "src"), to: "src" },
          { from: path.resolve(__dirname, "package.json"), to: "./" },
        ],
      }),
    ],
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
  };
};
