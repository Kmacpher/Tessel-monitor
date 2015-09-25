app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
        resolve: {

        }
    });
});

app.controller('HomeCtrl', function($scope, MeasureFactory) {

    setInterval(function() {
      MeasureFactory.getMeasurements()
      .then(function(measurements) {
        $scope.measurements = measurements;
        $scope.current = measurements[measurements.length-1];
        console.log('new scope');
      });

    },5000);

  
  

});

app.factory('MeasureFactory', function($http) {

  var getMeasurements = function() {
    return $http.get('/api/measure/')
    .then(function(res) {
      return res.data;
    });
  };
  
  return {
    getMeasurements: getMeasurements
  };

});