(function() {
 'use strict';
 
 angular.module('MenuApp')
 .component('categories', {
  templateUrl: 'categoriesComponent.template.html',
  bindings: {
   items: '<'
  }
 });
            
})();