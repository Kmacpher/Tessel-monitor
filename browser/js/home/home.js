app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          activeCritter: function(CritterFactory) {
            return CritterFactory.getActiveCritter();
          }
        }
    });
});

app.controller('HomeCtrl', function($scope, MeasureFactory, activeCritter) {

    $scope.activeCritter = activeCritter;

    MeasureFactory.getMeasurements($scope.activeCritter._id)
    .then(function(measurements) {

        $scope.measurements = measurements;
        $scope.current = measurements[measurements.length-1];

        setInterval(function() {
          MeasureFactory.getMeasurements($scope.activeCritter._id)
          .then(function(measures) {
            $scope.measurements = measures;
            $scope.current = measures[measures.length-1];
          });

        },5000);

    });
    
    //this continues to run constantly. 
    //actually only need to run when on this - maybe a set timeout and recursive function?
    //maybe set a limit that you get? ( in routes )


    //will need to add id of critter
    $scope.deleteMeasurements = function() {
      MeasureFactory.deleteMeasurements($scope.activeCritter._id)
      .then(function() {
        console.log('all measurements deleted');
      });
    };

});

app.factory('MeasureFactory', function($http) {

  var getMeasurements = function(critterId) {
    return $http.get('/api/measure/' + critterId)
    .then(function(res) {
      return res.data;
    });
  };

  //will need to add id of critter
  var deleteMeasurements = function(critterId) {
    return $http.delete('/api/measure/' + critterId)
    .then(function() {
      return;
    });
  };
  
  return {
    getMeasurements: getMeasurements,
    deleteMeasurements: deleteMeasurements
  };

});