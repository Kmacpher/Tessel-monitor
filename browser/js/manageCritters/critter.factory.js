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
        return $http.get('/api/critters/' + critterId)
        .then(function(res) {
            return res.data;
        });
    };

    var deleteCritter = function(critter) {
        return $http.delete('/api/critters/' + critter._id)
        .then(function(res) {
            return res.data;
        });
    };

    var updateCritter = function(critter) {
        return $http.put('/api/critters/' + critter._id, critter)
        .then(function(res) {
            return res.data;
        });
    };

    var createCritter = function(critter) {
        return $http.post('/api/critters/', critter)
        .then(function(res) {
            return res.data;
        });
    };
    
    return {
        getAllCritters: getAllCritters,
        getActiveCritter: getActiveCritter,
        getCritter: getCritter,
        deleteCritter: deleteCritter,
        createCritter: createCritter,
        updateCritter: updateCritter
    };
});