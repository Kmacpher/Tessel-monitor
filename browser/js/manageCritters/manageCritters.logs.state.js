app.config(function ($stateProvider) {
    $stateProvider.state('manageCritters.logs', {
        url: '/:id',
        templateUrl: 'js/manageCritters/manageCritters.logs.html',
        controller: 'CritterLogCtrl',
        resolve: {
          critter: function(CritterFactory, $stateParams) {
            return CritterFactory.getCritter($stateParams.id);
          }
        }
    });
    
});

app.controller('CritterLogCtrl', function($scope, critter, MeasureFactory) {

    $scope.critter = critter;

    MeasureFactory.getMeasurements($scope.critter._id)
    .then(function(measurements) {
      $scope.measurements = measurements;
    });
});

