app.config(function ($stateProvider) {
    $stateProvider.state('manageCritters', {
        url: '/critters',
        templateUrl: 'js/manageCritters/manageCritters.html',
        controller: 'CrittersCtrl',
        resolve: {
          critters: function(CritterFactory) {
            return CritterFactory.getAllCritters();
          }
        }
    });
    
});

app.controller('CrittersCtrl', function($scope, critters) {

    $scope.critters = critters;
});


app.factory('CritterFactory', function($http) {

    var getAllCritters = function() {
        return $http.get('/api/critters')
        .then(function(res) {
            console.log(res.data);
            return res.data;
        });
    };
    //getActiveCritter
    //createCritter
    //deleteCritter
    //getAllCritters
    //updateCritter

    return {
        getAllCritters: getAllCritters
    };
});