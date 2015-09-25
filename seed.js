/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
//var User = Promise.promisifyAll(mongoose.model('User'));
var Critter = Promise.promisifyAll(mongoose.model('Critter'));

var seedCritters = function () {

    var critters = [
        {
            name: 'Fira',
            species: 'Ball Python',
            phone: '2148682420',
            temperature: {
                high: 91,
                low: 80
            },
            humidity: {
                high: 90,
                low: 60
            },
            active: true
        },
        {
            name: 'Loki',
            species: 'Bearded Dragon',
            phone: '2148682420',
            temperature: {
                high: 110,
                low: 75
            },
            humidity: {
                high: 50,
                low: 10
            }
        }
    ];

    return Critter.createAsync(critters);

};

connectToDb.then(function () {
    Critter.findAsync({}).then(function (critters) {
        if (critters.length === 0) {
            return seedCritters();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
