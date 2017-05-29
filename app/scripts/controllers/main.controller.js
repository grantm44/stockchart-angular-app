'use strict';
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