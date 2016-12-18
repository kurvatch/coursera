(function () {
'use strict';
 
angular.module("ShoppingListCheckOff", [])
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
 
 ToBuyController.$inject = ['ShoppingListCheckOffService'];
 AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
 
 
 function ToBuyController(ShoppingListCheckOffService) {
  
  var ToBuy = this;

  ToBuy.items = ShoppingListCheckOffService.getToBuyItems();

  ToBuy.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
  
 }
 
 function AlreadyBoughtController(ShoppingListCheckOffService) {
  
  var AlreadyBrought = this;
  
  AlreadyBrought.items = ShoppingListCheckOffService.getAlreadyBroughtItems();
  
 }

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{name: "Cookies", quantity: "10"}, 
              {name: "Chips", quantity: "8"},
              {name: "Oranges", quantity: "6"},
              {name: "Soda", quantity: "4"},
              {name: "Apples", quantity: "2"}];

 var alreadyBroughtItems = [];

  service.removeItem = function (itemIdex) {
   alreadyBroughtItems.push(toBuyItems[itemIdex]);
   toBuyItems.splice(itemIdex, 1)
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };
 
 service.getAlreadyBroughtItems = function () {
  return alreadyBroughtItems;
 }
}

})();