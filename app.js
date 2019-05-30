const express = require('express');
const app = express();
const port = 3000;

let routes = require('./routes');
let models = require('./models');

//including models on the request context
//request context middleware
app.use((req, res, next) => {
	req.context = {
		models,
	};
	next();
});

app.use('/car', routes.car);
app.use('/customer', routes.customer);

app.listen(port);
