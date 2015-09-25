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


app.factory('CritterFactory', function($http) {

    var getAllCritters = function() {
        return $http.get('/api/critters')
        .then(function(res) {
            return res.data;
        });
    };

    var getActiveCritter = function() {
        return $http.get('/api/critters/active')
        .then(function(res) {
            return res.data;
        });
    };

    //getActiveCritter
    //createCritter
    //deleteCritter
    //getAllCritters
    //updateCritter

    return {
        getAllCritters: getAllCritters,
        getActiveCritter: getActiveCritter
    };
});