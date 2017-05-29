webpackJsonp([0],{

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, Highcharts) {
//var Highcharts = require('highcharts');
(function () {
  
  class MainController {
      
    constructor($http, stockService){
      this.$http = $http;
      this.stockService = stockService;
      this.chartConfig = this.getStockConfig();
      this.test = 'Hello';    
    }

    getStockData() {
      console.log('called');
      if(this.symbol){
        this.stockService.getStock(this.symbol.toUpperCase()).then(data => {
          var serie = data.data.datatable.data;
          //console.log(serie);
          for(var i = 0; i < serie.length; i++){
            //console.log(serie.length);
            for(var x = 0; x < serie[i].length; x++){
                serie[i][0] = moment(serie[i][0]).valueOf();
                console.log(serie[i]);
            }
          }
          //this.chartConfig.series[0].data.push(serie);
          this.chartConfig.series[0].setData(serie);
        });
      }
        
    }

    getStockConfig(){
      return Highcharts.chart('chart2',{
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: 'Stock'
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%b, %y'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Price'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [{
                    type: 'area',
                    name: 'Price',
                    data: []
                }]
              });
    }

  } //end class

module.exports = angular.module('stocksApp').controller('MainController', MainController);

})();

/**
 * @ngdoc function
 * @name stocksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stocksApp
 */








/*  component('main', {
    restrict: 'E',
    scope: {},
    templateUrl: './views/main.html',
    controller: 'MainController'*/
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(18)))

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = angular.module('stocksApp').config(function($stateProvider){

   $stateProvider
      .state('main',{
        url: '/',
        templateUrl: './views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

}); 


/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @ngdoc service
 * @name stocksApp.stockService
 * @description
 * # stockService
 * Service in the stocksApp.
 */

    // AngularJS will instantiate a singleton by calling "new" on this function
var moment = __webpack_require__(0);
class stockService {

    constructor($http){
      this.$http = $http;
    }

    getStock(name){

      var start_date = moment().subtract(1, 'year').format('YYYY-MM-DD');
      //https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=aapl&qopts.columns=date,open&api_key=EnKako51LDRb9jg9JwJH
      console.log(start_date);
      return this.$http.get('https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte='+ start_date + '&ticker='+ name + '&qopts.columns=date,open&api_key=EnKako51LDRb9jg9JwJH');
      
      //this.$http.get('https://www.quandl.com/api/v3/datasets/GOOG/NYSE_'+ name +'.json?api_key=EnKako51LDRb9jg9JwJH&start_date=' + start_date);
    }


}


module.exports = angular.module('stocksApp').service('stockService', stockService);


/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @ngdoc overview
 * @name stocksApp
 * @description
 * # stocksApp
 *
 * Main module of the application
. */
var angular = __webpack_require__(13);
var Highcharts = __webpack_require__(18);

var ngAnimate = __webpack_require__(27);
var ngCookies = __webpack_require__(28);
var ngResource = __webpack_require__(29);
var ngSanitize = __webpack_require__(30);
var ngTouch = __webpack_require__(31);
var uiRouter = __webpack_require__(26);

angular
  .module('stocksApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    //$locationProvider.html5Mode(true);

  });

__webpack_require__(184);
__webpack_require__(182);
__webpack_require__(183);

Highcharts.createElement('link', {
   href: 'https://fonts.googleapis.com/css?family=Unica+One',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
   colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
   chart: {
      backgroundColor: '#2a2a2b',
      style: {
         fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);



/***/ })

},[186]);