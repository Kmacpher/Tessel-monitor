app.directive('logs', function(MeasureFactory, CritterFactory) {

    return {
        restrict: 'E',
        scope: {
            measurements: '='
        },
        templateUrl: 'js/common/directives/logs/logs.html',
        link: function(scope) {
        scope.deleteMeasurements = function() {
            CritterFactory.getActiveCritter()
            .then(function(critter) {
              MeasureFactory.deleteMeasurements(critter._id)
                .then(function() {
                    console.log('all measurements deleted');
                });
            });
            

        };
      }
    };
});
