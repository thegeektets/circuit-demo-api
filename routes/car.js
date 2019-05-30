let { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
	var carSchema = require('mongoose').model('Car').schema.obj;
	let response = {
		modelInfo: carSchema,
		data: req.context.models.car,
	};
	return res.send(response);
});

module.exports = router;
