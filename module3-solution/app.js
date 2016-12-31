(function() {
        'use strict';

        angular.module('NarrowItDownApp', [])
            .controller("NarrowItDownController", NarrowItDownController)
            .service("MenuSearchService", MenuSearchService)
            .directive("foundItems", FoundItems)
            .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

        NarrowItDownController.$inject = ['MenuSearchService'];

        function NarrowItDownController(MenuSearchService) {
            var narrow = this;

            narrow.found = {};
            narrow.narrowMenuItems = function(searchTerm) {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

                promise.then(function(response) {
                    narrow.found = response;
                }, function(err) {
                    console.log('Error on resolving the promise')
                });

            }

            narrow.warning = "Nothing found";

            narrow.removeItem = function(itemIndex) {
                console.log("'this' is: ", this);
                console.log("Last item removed was " + narrow.found[itemIndex].name);
                narrow.found.splice(itemIndex, 1);
            };
        }

        MenuSearchService.$inject = ['$http', 'ApiBasePath'];

        function MenuSearchService($http, ApiBasePath) {
            var service = this;

            service.getMatchedMenuItems = function(searchTerm) {
                return $http({
                        method: "GET",
                        url: (ApiBasePath + "/menu_items.json"),
                    }).then(function(response) {
                        var foundItems = [];
                        for (var i = 0; i < response.data.menu_items.length; i++) {
                            if (response.data.menu_items[i].description.indexOf(searchTerm) !== -1) {
                                foundItems.push(response.data.menu_items[i]);
                            }
                        }
                        return foundItems;
                    })
                    .catch(function(error) {
                        console.log("Something went terribly wrong.");
                    });
            }
        }

        function FoundItems() {
            return {
                restrict: 'E',
                templateUrl: 'loader/itemsloaderindicator.template.html',
                scope: {
                    items: '<foundItems',
                    onRemove: '&'
                },
                transclude: true,
                controller: FoundItemsCntrl,
                controllerAs: 'cntrl',
                bindToController: true
            }
        }
 
        function FoundItemsCntrl() {
            var cntrl = this;

            cntrl.noItmesFound = function() {
                if (cntrl.items.length === 0) {
                    return true;
                }
                return false;
            }
        };
})();