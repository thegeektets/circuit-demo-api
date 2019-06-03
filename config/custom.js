let config = {
	mongodb: {
		password: 'root',
		username: 'circuit',
		collection: 'circuit-demo',
		connection_url:
			'@cluster0-svdz5.mongodb.net/circuit-demo?retryWrites=true&w=majority',
	},
};

module.exports = config;
