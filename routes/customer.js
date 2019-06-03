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
router.get('/', async (req, res) => {
	let customerSchema = require('../schema/customer');
	let customerModel = require('../models/customer');

	let response = {
		modelInfo: customerSchema.schema.obj,
		data: await customerModel.getCustomers(),
	};
	return res.send(response);
});

/**
 * @swagger
 * definition:
 *   createCustomerPayload:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       DOB:
 *         type: date
 *
 *
 */

/**
 * @swagger
 * customer:
 *   post:
 *     tags:
 *       - customer
 *     description: create a new customer in the system
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/createCustomerPayload'
 *     responses:
 *       200:
 *         description:  stored customer and model schema
 */

router.post('/', async (req, res) => {
	var customerModel = require('.././models/customer');
	let respond = await customerModel.createCustomer(req.body);
	res.status(respond.statusCode).send(respond.result);
});

module.exports = router;
