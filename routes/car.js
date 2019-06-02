let { Router } = require('express');

const router = Router();

/**
 * @swagger
 * car:
 *   get:
 *     tags:
 *       - car
 *     description: get stored cars and model schema
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:  stored cars and model schema
 */
router.get('/', (req, res) => {
	var carSchema = require('mongoose').model('car').schema.obj;
	let response = {
		modelInfo: carSchema,
		data: req.context.models.car,
	};
	return res.send(response);
});

module.exports = router;
