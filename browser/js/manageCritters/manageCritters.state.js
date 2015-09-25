app.config(function ($stateProvider) {
    $stateProvider.state('manageCritters', {
        url: '/critters',
        templateUrl: 'js/manageCritters/manageCritters.html',
        controller: 'CrittersCtrl',
        resolve: {
          critters: function(CritterFactory) {
            return CritterFactory.getAllCritters();
          },
          activeCritter: function(CritterFactory) {
            return CritterFactory.getActiveCritter();
          }
        }
    });
    
});

app.controller('CrittersCtrl', function($scope, critters, activeCritter) {

    $scope.critters = critters;
    $scope.activeCritter = activeCritter;
});

