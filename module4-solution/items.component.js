(function() {
 'use strict';
 
 angular.module('MenuApp')
 .component('items', {
  templateUrl: 'itemsComponent.template.html',
  bindings: {
   details: '<'
  }
 });
            
})();