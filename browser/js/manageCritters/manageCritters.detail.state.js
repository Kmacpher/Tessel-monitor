app.config(function ($stateProvider) {
    $stateProvider.state('manageCritters.detail', {
        url: '/:id',
        templateUrl: 'js/manageCritters/manageCritters.detail.html',
        controller: 'CritterCtrl',
        resolve: {
          critter: function(CritterFactory, $stateParams) {
            if($stateParams.id ==='new') return {};
            if(!$stateParams.id) return CritterFactory.getActiveCritter();
            return CritterFactory.getCritter($stateParams.id);
          },
          activeCritter: function(CritterFactory) {
            return CritterFactory.getActiveCritter();
          }
        }
    });
    
});

app.controller('CritterCtrl', function($scope, critter, activeCritter) {

  $scope.critter = critter;
  $scope.activeCritter = activeCritter;

});