import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin  from 'html-webpack-plugin'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
// if we run production or start, launch command will be start or production

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND
// inside babelrc file we can now have an envirnment property and in that we an have a start property so wheber BABEL_ENV = start (LAUNCH_COMMAND) aka dev mode, we can add a presets property which will have react-hrmke

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
}

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: 'index.html',
  inject: 'body'
})

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

// when we include pruction plugin in our plugins, it tells react we're in production mode...

const base = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: PATHS.build,
    hot: true,
    inline: true
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}
const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin]
}

// we want to merge base objects together with either developmentCinfig or productionConfig
// We cannot directly transpile webpack file using babel...
// But we can change name th ename of config file to webpack.config.babel.js and use ES6 syntax!!

export default Object.assign({}, base,  isProduction === true ? productionConfig : developmentConfig)
