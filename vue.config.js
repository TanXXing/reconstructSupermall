const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "src"),
        'views': '@/views',
        'components': '@/components',
        'router': '@/router',
        'store': '@/store',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets'
      },
      extensions: [".js", ".json", ".vue"]
    },
    module: {
      rules: [
        {
          test: /\.scss$/
        }
      ]
    }
  }
}

