//require the Twilio module and create a REST client
var client = require('twilio')('AC8ccff7e5baced5cb57b599a2cf68e1c1', '0457f456fda0ec9ddd98cc33bc249585');

//Send an SMS text message
var sendMessage = function(critter, type, data) {

    var bodyText = 'The ' + type +
        ' in '+ critter.name + '\'s cage is ' + data[type] +
        '. For a happy and healthy critter, the ' + type +
        ' should be between ' + critter[type].low + ' and ' +
        critter[type].high + '.';

    client.sendMessage({

        to:'+1'+ critter.phone, // Any number Twilio can deliver to
        from: '+14697897478', // A number you bought from Twilio 
        body: bodyText

    }, function(err, responseData) {

        if (!err) {

            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."

        }
    });
};

module.exports.sendMessage = sendMessage;
