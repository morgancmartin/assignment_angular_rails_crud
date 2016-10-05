app.factory("Pins", ["Restangular", "$stateParams", "$state", function(Restangular, $stateParams, $state) {


  var _pins;
  var Pins = {};

  Pins.find = function(id) {
    return Restangular.one("pins", id).get();
  };


  Pins.all = function() {
    _pins = Restangular.all("pins").getList().$object;
    return _pins;
  };

  var _createPin = function(params){
    return Restangular.all('pins').post({
      pin: {
        item_name: params.title,
        buy_sell: params.buySell,
        description: params.description,
        user_id: 1              //hard-coded
      }
    })
      .then(function(response) {
        console.log(response);
        _pins.unshift(response);
        return _pins;
      });
  };

  var _updatePin = function(params) {
    Restangular.one('pins', $stateParams.id).patch({
      pin: {
        item_name: params.title,
        buy_sell: params.buySell,
        description: params.description,
        user_id: 1              //hard-coded
      }
    }).then(function() {
      $state.go("show", {id: $stateParams.id});
    });
  };

  Restangular.extendCollection('pins', function(collection){
    collection.create = _createPin;
    return collection;
  });

  Restangular.extendModel('pins', function(pin){
    pin.update = _updatePin;
    return pin;
  });

  return Pins;
}]);
