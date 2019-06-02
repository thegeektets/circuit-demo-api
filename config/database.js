let mongoose = require('mongoose');
let custom_config = require('./custom');

let dbURL = `mongodb+srv://${custom_config.mongodb.username}:${
	custom_config.mongodb.password
}${custom_config.mongodb.connection_url}`;
let dbOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
};
module.exports = function() {
	mongoose.connect(dbURL, dbOptions);
	mongoose.connection.on('connected', function() {
		console.log('default connection is open to ', dbURL);
	});

	mongoose.connection.on('error', function(err) {
		console.error(`default connection has occured ${err} error`);
	});

	mongoose.connection.on('disconnected', function() {
		console.error('default connection is disconnected');
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log(
				'default connection is disconnected due to application termination',
			);
			process.exit(0);
		});
	});
};
