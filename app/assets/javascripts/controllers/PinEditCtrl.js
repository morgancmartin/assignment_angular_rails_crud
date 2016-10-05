app.controller("PinEditCtrl", ["$scope", "Pins", "$stateParams", "$state", "Restangular", 'pin', function($scope, Pins, $stateParams, $state, Restangular, pin) {

  $scope.pin = pin;
  $scope.newPin = {};
  $scope.newPin.item_name = $scope.pin.item_name;
  $scope.newPin.buy_sell = $scope.pin.buy_sell;
  $scope.newPin.description = $scope.pin.description;
  $scope.newPin.user_id = $scope.pin.user_id;

  $scope.editPin = function() {
    $scope.pin.update($scope.newPin);
  };

  $scope.deletePin = function(){
    $scope.pin.remove().then( function(){
      return $state.go('pins');
    });
  };

}]);
