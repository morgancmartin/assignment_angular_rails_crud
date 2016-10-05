app.controller("PinShowCtrl", ["$scope", "Pins", "$stateParams", "pin", "$state", function($scope, Pins, $stateParams, pin, $state) {

  $scope.pin = pin;

  $scope.deletePin = function(){
    $scope.pin.remove().then( function(){
      return $state.go('pins');
    });
  };


}]);
