app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          measurements: function(MeasureFactory) {
            return MeasureFactory.getMeasurements();
          }
        }
    });
});

app.controller('HomeCtrl', function($scope, MeasureFactory, measurements, $state) {

    $scope.measurements = measurements;

    setInterval(function() {
      MeasureFactory.getMeasurements()
      .then(function(measurements) {
        $scope.measurements = measurements;
        $scope.current = measurements[measurements.length-1];
        console.log('new scope');
      });

    },5000);

    //will need to add id of critter
    $scope.deleteMeasurements = function() {
      MeasureFactory.deleteMeasurements()
      .then(function() {
        console.log('all measurements deleted');
      });
    };

});

app.factory('MeasureFactory', function($http) {

  var getMeasurements = function() {
    return $http.get('/api/measure/')
    .then(function(res) {
      return res.data;
    });
  };

  //will need to add id of critter
  var deleteMeasurements = function() {
    return $http.delete('/api/measure')
    .then(function() {
      return;
    });
  };
  
  return {
    getMeasurements: getMeasurements,
    deleteMeasurements: deleteMeasurements
  };

});