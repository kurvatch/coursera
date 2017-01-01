(function() {
 
 'use strict';
 
 angular.module('MenuApp')
 .controller('ItemController', ItemController);
 
 ItemController.$inject = ['itemsList'];
 
 function ItemController(itemsList) {
  var itemCtrl = this;
  itemCtrl.itemsDetails = itemsList.data.menu_items;
 }
})();