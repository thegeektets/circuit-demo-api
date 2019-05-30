let { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
	var customerSchema = require('mongoose').model('Customer').schema.obj;
	let response = {
		modelInfo: customerSchema,
		data: req.context.models.customer,
	};
	return res.send(response);
});

module.exports = router;
