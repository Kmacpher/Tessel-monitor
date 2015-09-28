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

app.controller('CritterCtrl', function($scope, critter, activeCritter, CritterFactory, $stateParams, $state) {
  $scope.newCritter = ($stateParams.id === 'new');
  $scope.critter = critter;
  $scope.activeCritter = activeCritter;
  $scope.message = "";

  $scope.updateCritter = function() {
    if($scope.newCritter) {
      CritterFactory.createCritter($scope.critter)
      .then(function() {
        CritterFactory.getAllCritters()
        .then(function(critters) {
          $scope.$parent.critters = critters;
        });
      });
    }
    else {
      CritterFactory.updateCritter($scope.critter)
      .then(function() {
        $scope.message = $scope.critter.name + '\'s settings were successfully updated';
      });
    }
  };

  $scope.makeActive = function() {
    CritterFactory.makeActive($scope.critter)
    .then(function(active) {
      $scope.critter = active;
      $scope.activeCritter = active;
      CritterFactory.getAllCritters()
        .then(function(critters) {
          $scope.$parent.critters = critters;
        });
    });
  };


  $scope.deleteCritter = function() {
    if($scope.critter.active) {
      $scope.message = 'You can\'t delete your active critter';
      return;
    }
    CritterFactory.deleteCritter($scope.critter)
    .then(function() {
      CritterFactory.getAllCritters()
      .then(function(critters) {
        $scope.$parent.critters = critters;
        $state.go('manageCritters.deleted');
      });
      
      
    });

  };

});