var needle = require('needle');   
//var axios = require('axios');
console.log("needle defaults");
needle.defaults({
  json: true,
  timeout: 5000,
  'read_timeout': 5000,
  auth: 'basic',
  password: 'X'
});

function callAPI(options, callback) {
	console.log("callAPI  " + options.url);
	options.url = options.url.startsWith('https://') ? options.url : 'https://' + options.url;

	var resp =	needle.get(options.url, {username:options.apiKey, password:'X'}, function(error, response) {
	  if (!error && response.statusCode == 200)
		console.log(response.body);
	});
	resp.on('readable', function(obj) {
  var chunk;

  while (chunk = this.read()) {
    console.log('root = ', chunk);
  }
});
}

exports = {
 /* async: {
    forEachSeries: forEachSeries
  },*/
  callAPI: callAPI/*,
  inspect: inspect,
  diffTime: diffTime,
  saveTicket: saveTicket,
  withInWindow: withInWindow,
  generatePrimaryNote: generatePrimaryNote,
  generateSecondaryNote: generateSecondaryNote*/
};