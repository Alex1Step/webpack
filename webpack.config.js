const path = require("path"); //модуль node для указания путей
const HTMLWebpackPlugin = require("html-webpack-plugin"); //для того чтобы в index.html цеплялись бандлы
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //для того чтобы папка dist очищалась сама
const CopyWebpackPlugin = require("copy-webpack-plugin"); //копирование статических файлов в dist

module.exports = {
  context: path.resolve(__dirname, "src"), //указатель на главный каталог приложения
  mode: "development", //режим разработки или продакшна
  entry: {
    main: "./index.js", //входящие файлы
    analitycs: "./Analitycs.js", //входящие файлы
  },
  output: {
    filename: "[name].[contenthash].js", //что получаем на выходе, name и contentHash это паттерны которые переименовывают бандлы
    path: path.resolve(__dirname, "dist"), //куда помещать исходящие файлы
  },
  resolve: {
    extensions: [".js", ".json", ".png", ".xml"], //если не хочется в путях к файлам указывать расширения
    alias: {
      "@models": path.resolve(__dirname, "src/models"), //резервирование сокращенных названий путей
      "@": path.resolve(__dirname, "src"), //резервирование сокращенных названий путей
    },
  },
  devServer: {
    //dev-server
    port: 4200,
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all", //чтобы не дублировать код при подключении библиотек
    },
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./index.html" }), //подключаемые плагины, описаны выше в импортах
    new CleanWebpackPlugin(), //подключаемые плагины, описаны выше в импортах
    new CopyWebpackPlugin({
      //плагин копирования статических фаулов, указываем откуда и куда
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      //правила
      {
        test: /\.css$/, //если регулярка находит такой файл
        use: ["style-loader", "css-loader"], // то его нужно пропускать через такой лодер, лодеры устанавливаются отдельно
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
    ],
  },
};
