const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    client: {
      logging: "warn",
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    hot: false,
    compress: true,
    port: 8080,
    watchFiles: ["src/**/*.js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(sass|scss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-react-app"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./public/index.html",
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
        removeComments: true,
      },
    }),
  ],
};
