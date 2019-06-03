let { Router } = require('express');

const router = Router();

/**
 * @swagger
 * car:
 *   get:
 *     tags:
 *       - car
 *     description: get stored car and model schema
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:  stored car and model schema
 */
router.get('/', async (req, res) => {
	let carSchema = require('../schema/car');
	let carModel = require('../models/car');

	let response = {
		modelInfo: carSchema.schema.obj,
		data: await carModel.getCars(),
	};
	return res.send(response);
});

/**
 * @swagger
 * definition:
 *   createCarPayload:
 *     properties:
 *       make:
 *         type: string
 *       model:
 *         type: string
 *       year:
 *         type: string
 *       customer:
 *         type: string
 *
 *
 */

/**
 * @swagger
 * car:
 *   post:
 *     tags:
 *       - car
 *     description: create a new car in the system
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/createCarPayload'
 *     responses:
 *       200:
 *         description:  car created
 */

router.post('/', async (req, res) => {
	var carModel = require('.././models/car');
	let respond = await carModel.createCar(req.body);
	res.status(respond.statusCode).send(respond.result);
});

/**
 * @swagger
 * definition:
 *   updateCarPayload:
 *     properties:
 *       carId:
 *         type: string
 *       make:
 *         type: string
 *       model:
 *         type: string
 *       year:
 *         type: string
 *       customer:
 *         type: string
 *
 *
 */
/**
 * @swagger
 * car:
 *   put:
 *     tags:
 *       - car
 *     description: update exisitng car in the system
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/updateCarPayload'
 *     responses:
 *       200:
 *         description:  car updated
 */

router.put('/', async (req, res) => {
	var carModel = require('.././models/car');
	let respond = await carModel.updateCar(req.body);
	res.status(respond.statusCode).send(respond.result);
});

/**
 * @swagger
 * definition:
 *   removeCarPayload:
 *     properties:
 * 		 carId:
 * 		   type: string
 *
 */

/**
 * @swagger
 * car:
 *   delete:
 *     tags:
 *       - car
 *     description: remove exisitng car in the system
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/removeCarPayload'
 *     responses:
 *       200:
 *         description:  car removed
 */

router.delete('/', async (req, res) => {
	var carModel = require('.././models/car');
	let respond = await carModel.removeCar(req.body);
	res.status(respond.statusCode).send(respond.result);
});

module.exports = router;
