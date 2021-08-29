const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const distDir = path.resolve(__dirname, "dist");
const port = 4000;
console.log(distDir);
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  output: {
    path: distDir,
    filename: "bundle.[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
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
      },
      { test: /\.css$/, use: ["css-loader", "style-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ["dist"] })
  ],
  devServer: {
    host: "localhost",
    port: port,
    open: true,
    static: "./dist"
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};
