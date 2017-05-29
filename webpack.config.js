var webpack = require('webpack'),
       path = require('path');

module.exports = {
    context: __dirname + '/app/scripts',
    entry: {
        app: './app.js',
        vendor: [
          'jquery',
          'bootstrap',
          'highcharts',
          'angular',
          'angular-animate',
          'angular-cookies',
          'angular-resource',
          'angular-sanitize',
          'angular-touch',
          '@uirouter/angularjs',
          'moment'
        ]
    },
    output: {
        path: __dirname + '/app/js',
        filename: 'app.bundle.js'
    },
    resolve: {
      modules: ['node_modules']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"}),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          Highcharts: 'highcharts',
          moment: 'moment'
        })
    ]
};