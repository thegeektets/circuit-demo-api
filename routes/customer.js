let { Router } = require('express');

const router = Router();

/**
 * @swagger
 * customer:
 *   get:
 *     tags:
 *       - customer
 *     description: get stored customer and model schema
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:  stored customer and model schema
 */
router.get('/', (req, res) => {
	var customerSchema = require('mongoose').model('Customer').schema.obj;
	let response = {
		modelInfo: customerSchema,
		data: req.context.models.customer,
	};
	return res.send(response);
});

module.exports = router;
