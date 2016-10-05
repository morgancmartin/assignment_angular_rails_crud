var app = angular.module("crud", ["ui.router", 'restangular'])

app.factory('_', ['$window', function(){
  return $window._;
}]);


app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/pins");

  $stateProvider.state("pins", {
    url: "/pins",
    templateUrl: "templates/pins/index.html",
    controller: "PinsCtrl"
  })

    .state("show", {
      url: "/pins/:id",
      templateUrl: "templates/pins/show.html",
      controller: "PinShowCtrl",
      resolve: {
        pin: ['Pins', '$stateParams', function(Pins, $stateParams){
          return Pins.find($stateParams.id);
        }]
      }
    })

    .state("edit", {
      url: "/pins/:id/edit",
      templateUrl: "templates/pins/edit.html",
      controller: "PinEditCtrl",
      resolve: {
        pin: ['Pins', '$stateParams', function(Pins, $stateParams){
          return Pins.find($stateParams.id);
        }]
      }
    });

});

app.config(
  ["$httpProvider",
  function($httpProvider) {
  var token = $('meta[name=csrf-token]')
  .attr('content');
  $httpProvider
  .defaults
  .headers
  .common['X-CSRF-Token'] = token;
}]);

// Restangular config
app.config(
  ['RestangularProvider',
  function(RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

}]);
