var http = require('http');
var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['A']);



var postOptions = {
    host: "192.168.1.21",
    port: 1337,
    path: "/api/measure",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
};


function SendData(postData) {
  var req = http.request(postOptions, function(res) {
    console.log('# statusCode', res.statusCode);

    res.on('end', function () {
      console.log('done!');
    });

    res.on('data', function(data) {
      //don't need anything here... but doesn't seem to work otherwise
    });

  });

  req.on('error', function (e) {
    console.log('not ok -', e.stack, 'error event');
  });

  req.write(postData);
  req.end();

}

climate.on('ready', function () {
  console.log('Connected to si7005');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        temp -= 11;
        var postData = JSON.stringify({
          'temperature': temp.toFixed(2),
          'humidity': humid.toFixed(2)
        });
        SendData(postData);
        setTimeout(loop, 5000);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});




