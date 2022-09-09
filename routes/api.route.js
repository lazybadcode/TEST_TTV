const router = require('express').Router();
const apiController = require('../api/api.controller');

router.get('/create_parking', apiController.lineHealthCheck);

router.get('/park_the_car', apiController.lineHealthCheck);

router.get('/leave_the_slot', apiController.lineHealthCheck);

router.get('/get_parking_status', apiController.lineHealthCheck);

router.get('/get_plate_number_by_car_size', apiController.lineHealthCheck);

router.get('/get_slot_number_by_car_size', apiController.lineHealthCheck);

module.exports = router;