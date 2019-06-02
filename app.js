/* eslint-disable no-undef */
const express = require('express');
const app = express();
const port = 3000;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swagger.json');
const path = require('path');
const bodyParser = require('body-parser');
const initDatabase = require('./config/database');

app.use(bodyParser.json());

//db connection
initDatabase();

const options = {
	swaggerDefinition,
	apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});
app.get('/docs', (req, res) => {
	res.sendFile(path.join(__dirname, 'redoc.html'));
});

let routes = require('./routes');

app.use('/car', routes.car);
app.use('/customer', routes.customer);

app.listen(port);
