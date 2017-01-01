(function () {
'use strict';
 
angular.module('MenuApp')
.config(RouteConfig);
 
 RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
 
 function RouteConfig($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
  .state('home', {
   url: '/',
   templateUrl: 'menudata.template.html' 
  })
  
  .state('categories', {
   url: '/categories',
   templateUrl: 'categories.template.html',
   controller: 'CategoriesController as menu',
   resolve: {
      categoryList: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  
  .state('items', {
   url: '/items/{categoryName}',
   templateUrl: 'items.template.html',
   controller: 'ItemController as itemCtrl',
   resolve: {
      itemsList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.categoryName);
      }]
    }
  });
  
 };

})();