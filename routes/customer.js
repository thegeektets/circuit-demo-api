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
 *         description:  customer created
 */

router.post('/', async (req, res) => {
	var customerModel = require('.././models/customer');
	let respond = await customerModel.createCustomer(req.body);
	res.status(respond.statusCode).send(respond.result);
});

/**
 * @swagger
 * definition:
 *   updateCustomerPayload:
 *     properties:
 *       customerId:
 *         type: string
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
 *   put:
 *     tags:
 *       - customer
 *     description: update exisitng customer in the system
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateCustomerPayload'
 *     responses:
 *       200:
 *         description:  customer updated
 */

router.put('/', async (req, res) => {
	var customerModel = require('.././models/customer');
	let respond = await customerModel.updateCustomer(req.body);
	res.status(respond.statusCode).send(respond.result);
});

/**
 * @swagger
 * definition:
 *   removeCustomerPayload:
 *     properties:
 * 		 customerId:
 * 		   type: string
 *
 */

/**
 * @swagger
 * customer:
 *   delete:
 *     tags:
 *       - customer
 *     description: remove exisitng customer in the system
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/removeCustomerPayload'
 *     responses:
 *       200:
 *         description:  customer removed
 */

router.delete('/', async (req, res) => {
	var customerModel = require('.././models/customer');
	let respond = await customerModel.removeCustomer(req.body);
	res.status(respond.statusCode).send(respond.result);
});

module.exports = router;
