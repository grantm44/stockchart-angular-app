'use strict';

module.exports = angular.module('stocksApp').config(function($stateProvider){

   $stateProvider
      .state('main',{
        url: '/',
        templateUrl: './views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

}); 
