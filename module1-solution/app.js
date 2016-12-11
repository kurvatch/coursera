(function() {
 'use strict';
 
 angular.module('LunchCheck', [])
 
 .controller('LunchCheckController', LunchCheckController)
 
 LunchCheckController.$inject = ['$scope'];
 
 function LunchCheckController($scope) {
  
  $scope.inputText = "";
  
  $scope.buttonClick = function () {
   
   var textArr = $scope.inputText.split(',');
   textArr = textArr.filter(function(v){
    return v !== '' && v !== ' ';
   });
   
   if(textArr.length == 0) {
    $scope.message = 'Please enter data first';
   } else if (textArr.length <= 3) {
    $scope.message = 'Enjoy!';
   } else if (textArr.length > 3) {
    $scope.message = 'Too much!';
   }
  }
  
  $scope.checkMessage = function() {
   if($scope.message === 'Enjoy!' || $scope.message === 'Too much!') {
    return "greenMessage";
   } else if ($scope.message === 'Please enter data first') {
    return "redMessage";
   }
  }
 }
 
})();