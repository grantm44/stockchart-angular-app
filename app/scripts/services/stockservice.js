'use strict';

/**
 * @ngdoc service
 * @name stocksApp.stockService
 * @description
 * # stockService
 * Service in the stocksApp.
 */

    // AngularJS will instantiate a singleton by calling "new" on this function
var moment = require('moment');
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
