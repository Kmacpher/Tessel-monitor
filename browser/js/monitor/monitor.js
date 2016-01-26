app.config(function ($stateProvider) {
    $stateProvider.state('monitor', {
        url: '/',
        templateUrl: 'js/monitor/monitor.html',
        controller: 'MonitorCtrl',
        resolve: {
          activeCritter: function(CritterFactory) {
            return CritterFactory.getActiveCritter();
          }
        }
    });
});

app.controller('MonitorCtrl', function($scope, MeasureFactory, activeCritter) {

    $scope.activeCritter = activeCritter;

    MeasureFactory.getMeasurements($scope.activeCritter._id)
    .then(function(measurements) {

        $scope.measurements = measurements;
        $scope.current = measurements[0];

        if($scope.current.temperature > activeCritter.temperature.high ||
          $scope.current.temperature < activeCritter.temperature.low) {
          $scope.tempDanger = true;
        }
        if($scope.current.humidity > activeCritter.humidity.high ||
          $scope.current.humidity < activeCritter.humidity.low) {
          $scope.humidDanger = true;
        }


        setInterval(function() {
          MeasureFactory.getMeasurements($scope.activeCritter._id)
          .then(function(measures) {
            $scope.measurements = measures;
            $scope.current = measures[0];

            if($scope.current.temperature > activeCritter.temperature.high ||
              $scope.current.temperature < activeCritter.temperature.low) {
              $scope.tempDanger = true;
            }
            if($scope.current.humidity > activeCritter.humidity.high ||
              $scope.current.humidity < activeCritter.humidity.low) {
              $scope.humidDanger = true;
            }
          });

        },5000); //will be every 5 min in future

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