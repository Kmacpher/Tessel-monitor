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

    var getCritter = function(critterId) {
        console.log('in the getCritter');
        return $http.get('/api/critters/' + critterId)
        .then(function(res) {
            return res.data;
        });
    };
    
    //createCritter
    //deleteCritter
    //updateCritter

    return {
        getAllCritters: getAllCritters,
        getActiveCritter: getActiveCritter,
        getCritter: getCritter
    };
});