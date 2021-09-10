const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const lodash = require("lodash");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const distDir = path.resolve(__dirname, "dist");

const commonConfig = {
  mode: process.env.ENV || "development",
  devtool: "inline-source-map",
  output: {
    path: distDir
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  // plugins: [new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ["dist"] })],
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};

const mainConfig = lodash.cloneDeep(commonConfig);
mainConfig.entry = "./src/main/main.ts";
mainConfig.target = "electron-main";
mainConfig.output.filename = "main.bundle.js";
mainConfig.plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: "package.json",
        to: "package.json",
        transform: (content) => {
          const jsonContent = JSON.parse(content);
          delete jsonContent.devDependencies;
          delete jsonContent.scripts;
          delete jsonContent.build;

          jsonContent.main = "./main.bundle.js";
          jsonContent.scripts = { start: "electron ./main.bundle.js" };
          jsonContent.postinstall = "electron-builder install-app-deps";
          return JSON.stringify(jsonContent, undefined, 2);
        }
      }
    ]
  })
];
mainConfig.devServer = { port: 3000 };

const rendererConfig = lodash.cloneDeep(commonConfig);
rendererConfig.entry = "./src/renderer/index.tsx";
rendererConfig.target = "electron-renderer";
rendererConfig.output.filename = "renderer.bundle.js";
rendererConfig.plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./public/index.html")
  })
];
rendererConfig.module.rules.push({ test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] });

module.exports = [mainConfig, rendererConfig];
